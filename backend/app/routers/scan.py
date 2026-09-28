import json
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.services.scan_service import process_scan
from app.schemas.scan import ScanResponse

router = APIRouter(prefix="/scan", tags=["Scan"])


# ─── SCAN UPLOAD ─────────────────────────────────────────
@router.post("/upload", response_model=ScanResponse)
async def upload_scan(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Scan process করো (file validation — content-type, extension,
    # real image content check — app/utils/file_handler.py তে হয়)
    scan_result = await process_scan(
        file=file,
        user_id=current_user.id,
        db=db
    )

    # flags JSON string থেকে list এ convert করো
    flags_list = json.loads(scan_result.flags) if scan_result.flags else []

    return ScanResponse(
        message="Scan সম্পন্ন হয়েছে",
        extracted_text=scan_result.extracted_text or "",
        risk_level=scan_result.risk_level or "UNKNOWN",
        risk_score=scan_result.risk_score or 0,
        flags=flags_list,
        explanation=scan_result.explanation or ""
    )