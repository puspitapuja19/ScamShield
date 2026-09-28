import json
import logging
from sqlalchemy.orm import Session
from fastapi import UploadFile, HTTPException
from fastapi.concurrency import run_in_threadpool
from app.utils.file_handler import validate_and_read_upload
from app.services.ocr_service import extract_text_from_bytes
from app.services.ai_service import analyze_text_for_scam
from app.models.scan import ScanHistory

logger = logging.getLogger(__name__)


async def process_scan(file: UploadFile, user_id: int, db: Session) -> ScanHistory:
    try:
        # Validate + read into memory (no disk save)
        image_bytes = await validate_and_read_upload(file)

        # OCR in threadpool (non-blocking)
        try:
            extracted_text = await run_in_threadpool(extract_text_from_bytes, image_bytes)
        except RuntimeError:
            raise HTTPException(status_code=422, detail="Image থেকে text বের করা যায়নি।")

        if not extracted_text or extracted_text == "কোনো text পাওয়া যায়নি":
            raise HTTPException(status_code=422, detail="Image থেকে কোনো text বের করা যায়নি।")

        ai_result = analyze_text_for_scam(extracted_text)

        scan_record = ScanHistory(
            user_id=user_id,
            image_path=None,
            extracted_text=extracted_text,
            risk_level=ai_result.get("risk_level"),
            risk_score=ai_result.get("risk_score"),
            flags=json.dumps(ai_result.get("flags", [])),
            explanation=ai_result.get("explanation")
        )

        db.add(scan_record)
        db.commit()
        db.refresh(scan_record)
        return scan_record

    except HTTPException:
        db.rollback()
        raise
    except Exception:
        db.rollback()
        logger.exception("Scan process এ unexpected error হয়েছে")
        raise HTTPException(status_code=500, detail="Scan process এ একটি সমস্যা হয়েছে।")
        