import re
from pydantic import BaseModel, EmailStr, field_validator
from datetime import datetime

# Register করার সময় user যা পাঠাবে
class UserCreate(BaseModel):
    email: EmailStr
    password: str

    @field_validator("password")
    @classmethod
    def validate_password(cls, value: str) -> str:
        if len(value) < 8:
            raise ValueError("Password কমপক্ষে 8 character হতে হবে")
        if len(value.encode("utf-8")) > 72:
            raise ValueError("Password সর্বোচ্চ 72 character হতে পারবে")
        if not re.search(r"[A-Z]", value):
            raise ValueError("Password এ কমপক্ষে একটি uppercase letter (A-Z) থাকতে হবে")
        if not re.search(r"\d", value):
            raise ValueError("Password এ কমপক্ষে একটি digit (0-9) থাকতে হবে")
        if not re.search(r"[!@#$%^&*(),.?\":{}|<>_\-+=\[\]\\/~`;']", value):
            raise ValueError("Password এ কমপক্ষে একটি special character (!@#$% ইত্যাদি) থাকতে হবে")
        return value

# Login করার সময় user যা পাঠাবে
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Response এ user এর যা তথ্য দেখাবে (password দেখাবে না!)
class UserOut(BaseModel):
    id: int
    email: str
    created_at: datetime

    class Config:
        from_attributes = True

# Login সফল হলে token দেবে
class Token(BaseModel):
    access_token: str
    token_type: str

# Token এর ভেতরে যা থাকবে
class TokenData(BaseModel):
    email: str | None = None