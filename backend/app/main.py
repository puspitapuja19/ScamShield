import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, scan, history

# Logging setup — যাতে logger.exception() এর output terminal এ দেখা যায়
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)

app = FastAPI(
    title="Scam Message Detector API",
    description="Screenshot upload করো, scam কিনা জানো",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://scam-detection-ivory.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# সব routers register করো
app.include_router(auth.router)
app.include_router(scan.router)
app.include_router(history.router)

@app.get("/")
def root():
    return {"message": "Puspita r Scam Detector Poreject এর API চলছে 💙✅"}