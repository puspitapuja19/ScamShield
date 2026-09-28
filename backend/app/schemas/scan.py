from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

class ScanOut(BaseModel):
    id: int
    extracted_text: Optional[str]
    risk_level: Optional[str]
    risk_score: Optional[int]
    flags: Optional[str]
    explanation: Optional[str]
    scanned_at: datetime

    class Config:
        from_attributes = True

class ScanResponse(BaseModel):
    message: str
    extracted_text: str
    risk_level: str
    risk_score: int
    flags: List[str]
    explanation: str