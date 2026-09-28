from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.core.database import get_db
from app.core.security import hash_password, verify_password, create_access_token, verify_token
from app.core.dependencies import get_current_user
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin, UserOut, Token

router = APIRouter(prefix="/auth", tags=["Authentication"])

# একটা dummy hash — user না থাকলেও verify_password call করে timing attack ঠেকাতে ব্যবহার হবে
DUMMY_HASH = "$2b$12$invalidsaltinvalidsaltinvalidsaltinvalidsalt"


# ─── REGISTER ────────────────────────────────────────────
@router.post("/register", response_model=UserOut, status_code=201)
def register(user_data: UserCreate, db: Session = Depends(get_db)):

    email = user_data.email.lower().strip()

    # Email already exists check
    existing_user = db.query(User).filter(
        User.email == email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="এই email দিয়ে আগেই account আছে!"
        )

    # Password hash করো
    hashed = hash_password(user_data.password)

    # নতুন user তৈরি করো
    new_user = User(
        email=email,
        hashed_password=hashed
    )

    db.add(new_user)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=400,
            detail="এই email দিয়ে আগেই account আছে!"
        )
    db.refresh(new_user)
    return new_user


# ─── LOGIN ───────────────────────────────────────────────
@router.post("/login", response_model=Token)
def login(user_data: UserLogin, db: Session = Depends(get_db)):

    email = user_data.email.lower().strip()

    user = db.query(User).filter(
        User.email == email
    ).first()

    if not user:
        # timing attack ঠেকাতে dummy hash এর সাথে verify করা হচ্ছে
        verify_password(user_data.password, DUMMY_HASH)
        raise HTTPException(
            status_code=401,
            detail="Email বা password ভুল!"
        )

    if not verify_password(user_data.password, user.hashed_password):
        raise HTTPException(
            status_code=401,
            detail="Email বা password ভুল!"
        )

    token = create_access_token(data={"sub": user.email})
    return {
        "access_token": token,
        "token_type": "bearer"
    }


# ─── GET CURRENT USER ────────────────────────────────────
@router.get("/me", response_model=UserOut)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user