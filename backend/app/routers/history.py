import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.models.scan import ScanHistory
from app.schemas.scan import ScanOut

router = APIRouter(prefix="/history", tags=["History"])


# ─── GET ALL HISTORY ──────────────────────────────────────
@router.get("/me", response_model=List[ScanOut])
def get_my_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    scans = db.query(ScanHistory).filter(
        ScanHistory.user_id == current_user.id
    ).order_by(ScanHistory.scanned_at.desc()).all()

    return scans


# ─── GET SINGLE SCAN ──────────────────────────────────────
@router.get("/me/{scan_id}", response_model=ScanOut)
def get_single_scan(
    scan_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    scan = db.query(ScanHistory).filter(
        ScanHistory.id == scan_id,
        ScanHistory.user_id == current_user.id
    ).first()

    if not scan:
        raise HTTPException(
            status_code=404,
            detail="Scan পাওয়া যায়নি"
        )

    return scan


# ─── DELETE SINGLE SCAN ───────────────────────────────────
@router.delete("/me/{scan_id}")
def delete_scan(
    scan_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    scan = db.query(ScanHistory).filter(
        ScanHistory.id == scan_id,
        ScanHistory.user_id == current_user.id
    ).first()

    if not scan:
        raise HTTPException(
            status_code=404,
            detail="Scan পাওয়া যায়নি"
        )

    db.delete(scan)
    db.commit()

    return {"message": "Scan সফলভাবে delete হয়েছে ✅"}