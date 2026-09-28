from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import verify_token
from app.models.user import User

security = HTTPBearer(auto_error=False)

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    if credentials is None:
        raise HTTPException(status_code=401, detail="Authorization token দেওয়া হয়নি, আবার login করুন")

    token = credentials.credentials
    email = verify_token(token)

    if not email:
        raise HTTPException(status_code=401, detail="Token invalid অথবা expire হয়ে গেছে, আবার login করুন")

    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=401, detail="User পাওয়া যায়নি")

    return user