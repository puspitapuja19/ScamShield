import io
from fastapi import UploadFile, HTTPException
from PIL import Image, UnidentifiedImageError

MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB
ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png", "webp"}
ALLOWED_CONTENT_TYPES = {"image/jpeg", "image/png", "image/webp"}
ALLOWED_PIL_FORMATS = {"JPEG", "PNG", "WEBP"}


async def validate_and_read_upload(file: UploadFile) -> bytes:
    # 1. Content-Type check
    if file.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(status_code=400, detail="শুধু JPG, PNG, WEBP image upload করা যাবে")

    # 2. Extension check
    extension = file.filename.rsplit(".", 1)[-1].lower() if "." in file.filename else ""
    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail="File extension সঠিক নয়")

    # 3. Chunked read with size limit
    contents = bytearray()
    chunk_size = 1024 * 1024
    while True:
        chunk = await file.read(chunk_size)
        if not chunk:
            break
        contents.extend(chunk)
        if len(contents) > MAX_FILE_SIZE:
            raise HTTPException(status_code=400, detail="File size সর্বোচ্চ 5MB হতে পারবে")
    contents = bytes(contents)

    # 4. Real content check — actual image verification
    try:
        image = Image.open(io.BytesIO(contents))
        image.verify()
        image = Image.open(io.BytesIO(contents))
        if image.format not in ALLOWED_PIL_FORMATS:
            raise HTTPException(status_code=400, detail="File এর প্রকৃত content একটি valid image না")
    except UnidentifiedImageError:
        raise HTTPException(status_code=400, detail="File টি প্রকৃতপক্ষে image না — corrupt বা spoofed file")

    return contents