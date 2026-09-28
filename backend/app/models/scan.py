from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base

class ScanHistory(Base):
    __tablename__ = "scan_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    image_path = Column(String, nullable=True)
    extracted_text = Column(Text, nullable=True)
    risk_level = Column(String, nullable=True)  # LOW, MEDIUM, HIGH
    risk_score = Column(Integer, nullable=True)  # 0-100
    flags = Column(Text, nullable=True)          # JSON string
    explanation = Column(Text, nullable=True)
    scanned_at = Column(DateTime(timezone=True), server_default=func.now())

    owner = relationship("User", back_populates="scans")