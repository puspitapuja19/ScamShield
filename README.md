# 🛡️ ScamShield

**AI-powered scam message detection — upload a screenshot, get an instant risk assessment.**

ScamShield is a full-stack web application that helps people identify fraudulent SMS, email, and chat messages before they fall victim to them. Upload a screenshot of a suspicious message, and the system extracts the text via OCR, analyzes it with an LLM, and returns a clear risk score with an explanation — in both English and Bengali.

Built end-to-end: authentication, OCR pipeline, AI integration, persistent scan history, and a production deployment on Docker/Render/Vercel.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Project Structure](#project-structure)
- [API Overview](#api-overview)
- [Security Notes](#security-notes)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Contact](#contact)

---

## Overview

Scam messages — fake bank alerts, prize notifications, phishing links — are a daily threat, and they're often written to look convincing at a glance. ScamShield gives anyone a fast, evidence-based second opinion: upload a screenshot, and within seconds get a **risk score**, a **list of red flags**, and a **plain-language explanation** of why a message looks (or doesn't look) like a scam.

The project was built as a complete production system, not just a prototype — with real user authentication, persistent history, a polished responsive UI, and a live deployment.

## Key Features

- 🔐 **Secure authentication** — JWT-based auth with bcrypt password hashing, timing-attack-resistant login, and enforced password strength rules
- 🖼️ **Screenshot upload with real validation** — file type, size, and *actual image content* verification (not just trusting file extensions)
- 🔤 **Bilingual OCR** — EasyOCR extracts text from screenshots in both **English and Bengali**
- 🤖 **AI-powered scam analysis** — Groq-hosted LLM evaluates extracted text for scam patterns and generates a risk score, threat signals, and explanation
- 📊 **Interactive risk visualization** — animated risk gauge, LOW/MEDIUM/HIGH spectrum indicator, and categorized threat signals
- 📁 **Scan history** — every scan is saved, searchable, and filterable by risk level
- 📱 **Fully responsive UI** — mobile-first design with a collapsible sidebar navigation
- 🌐 **Live production deployment** — Dockerized backend on Render, frontend on Vercel, database on Supabase

## Tech Stack

**Backend**
- FastAPI (Python)
- PostgreSQL via Supabase (SQLAlchemy ORM + Alembic migrations)
- JWT authentication (python-jose) + bcrypt password hashing
- EasyOCR (PyTorch-based OCR engine, CPU-optimized for deployment)
- Groq API (LLM-based scam analysis)
- Docker

**Frontend**
- React + Vite
- Tailwind CSS
- Framer Motion (animations)
- React Router
- Axios
- react-hot-toast

**Infrastructure**
- Backend hosting: Render (Docker)
- Frontend hosting: Vercel
- Database: Supabase (managed PostgreSQL)

## Architecture

```
┌─────────────┐        ┌──────────────┐        ┌─────────────┐
│   React     │ HTTPS  │   FastAPI    │        │  Supabase   │
│  (Vercel)   ├───────►│   (Render)   ├───────►│ PostgreSQL  │
└─────────────┘        └──────┬───────┘        └─────────────┘
                               │
                    ┌──────────┴──────────┐
                    │                     │
              ┌─────▼─────┐        ┌──────▼──────┐
              │  EasyOCR  │        │  Groq API   │
              │ (OCR/text │        │ (scam risk  │
              │extraction)│        │  analysis)  │
              └───────────┘        └─────────────┘
```

**Flow:** User uploads a screenshot → backend validates and saves the file → EasyOCR extracts text → extracted text is sent to Groq's LLM for scam analysis → structured result (risk score, flags, explanation) is saved to the database and returned to the frontend.

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+ and npm
- A [Supabase](https://supabase.com) account (free tier works)
- A [Groq](https://console.groq.com) API key (free tier available)

### Backend Setup

```bash
git clone https://github.com/puspitapuja19/ScamShield.git
cd ScamShield/backend

# Create and activate a virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # macOS/Linux

# Install dependencies
pip install -r requirements.txt
```

Create a `.env` file in `backend/` (see `.env.example` for the full template):

```env
DATABASE_URL=postgresql://<user>:<password>@<supabase-pooler-host>:5432/postgres
SECRET_KEY=<your-generated-secret>
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
GROQ_API_KEY=<your-groq-api-key>
GROQ_MODEL=openai/gpt-oss-20b
```

> Generate a secure `SECRET_KEY` with:
> `python -c "import secrets; print(secrets.token_hex(32))"`

Run database migrations, then start the server:

```bash
alembic upgrade head
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`, with interactive docs at `http://localhost:8000/docs`.

### Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in `frontend/`:

```env
VITE_API_BASE_URL=http://localhost:8000
```

Start the dev server:

```bash
npm run dev
```

Visit `http://localhost:5173`.

## Project Structure

```
ScamShield/
├── backend/
│   ├── app/
│   │   ├── core/          # config, database, security, shared dependencies
│   │   ├── models/        # SQLAlchemy models
│   │   ├── routers/       # auth, scan, history endpoints
│   │   ├── schemas/       # Pydantic request/response schemas
│   │   ├── services/      # OCR service, AI analysis service
│   │   └── utils/         # file validation & handling
│   ├── alembic/           # database migrations
│   ├── Dockerfile
│   └── requirements.txt
│
└── frontend/
    ├── src/
    │   ├── api/            # Axios instance & interceptors
    │   ├── components/     # layout, auth, scan, history, ui components
    │   ├── context/        # AuthContext
    │   ├── hooks/          # useAuth
    │   ├── pages/           # route-level pages
    │   └── constants/       # routes, risk levels, config
    └── package.json
```

## API Overview

| Endpoint | Method | Description |
|---|---|---|
| `/auth/register` | `POST` | Create a new account |
| `/auth/login` | `POST` | Authenticate and receive a JWT |
| `/auth/me` | `GET` | Get the current authenticated user |
| `/scan/upload` | `POST` | Upload a screenshot for scam analysis |
| `/history/me` | `GET` | Get all scans for the current user |
| `/history/me/{scan_id}` | `GET` | Get a single scan's full details |
| `/history/me/{scan_id}` | `DELETE` | Delete a scan |

Full interactive API documentation is available at `/docs` (Swagger UI) once the backend is running.

## Security Notes

This project implements several security practices worth highlighting:

- Passwords hashed with bcrypt, never stored or logged in plaintext
- Timing-attack-resistant login (constant-time comparison even for non-existent users)
- JWT tokens with expiration, validated on every protected request
- File uploads validated by actual binary content (via Pillow), not just filename/MIME type
- SQL injection prevented via SQLAlchemy's parameterized ORM queries throughout
- Environment-based secrets management — no credentials committed to source control

## Roadmap

- [ ] Expand scan history with export/reporting options
- [ ] Add a browser extension for one-click scanning
- [ ] Support additional languages beyond English/Bengali
- [ ] Add rate limiting and abuse protection on the scan endpoint
- [ ] Explore fine-tuned classification model as an alternative to LLM-based analysis

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check the [issues page](https://github.com/puspitapuja19/ScamShield/issues) or open a pull request.

## Contact

**Puspita Nandi**
GitHub: [@puspitapuja19](https://github.com/puspitapuja19)

---

<sub>Built as a full-stack portfolio project demonstrating end-to-end product development — from database design to production deployment.</sub>
