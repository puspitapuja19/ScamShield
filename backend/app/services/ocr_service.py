import numpy as np
from PIL import Image
import io

_reader = None

def get_reader():
    global _reader
    if _reader is None:
        import easyocr
        print("🔄 EasyOCR model loading...")
        _reader = easyocr.Reader(['en', 'bn'], gpu=False)
        print("✅ EasyOCR model loaded!")
    return _reader

def extract_text_from_bytes(image_bytes: bytes) -> str:
    try:
        image = Image.open(io.BytesIO(image_bytes))
        image_array = np.array(image)
        results = get_reader().readtext(image_array)
        extracted_text = " ".join([result[1] for result in results])
        if not extracted_text.strip():
            return "কোনো text পাওয়া যায়নি"
        return extracted_text.strip()
    except Exception as e:
        raise RuntimeError(f"OCR processing failed: {str(e)}")