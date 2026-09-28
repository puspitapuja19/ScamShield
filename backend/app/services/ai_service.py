import json
from groq import Groq
from app.core.config import settings

# Groq client তৈরি করো
client = Groq(api_key=settings.GROQ_API_KEY)

def analyze_text_for_scam(text: str) -> dict:
    try:
        # AI কে কী বলবো সেটা লেখো
        prompt = f"""
You are a scam detection expert. Analyze the following message and determine if it's a scam, phishing, or legitimate message.

Message to analyze:
"{text}"

Respond ONLY with a valid JSON object in this exact format (no extra text):
{{
    "risk_level": "LOW" or "MEDIUM" or "HIGH",
    "risk_score": (number between 0-100),
    "flags": ["flag1", "flag2"],
    "explanation": "brief explanation in Bengali or English"
}}

Guidelines:
- HIGH (70-100): Clear scam indicators like prize claims, urgent money requests, suspicious links
- MEDIUM (30-69): Some suspicious elements but not conclusive  
- LOW (0-29): Appears legitimate

Respond with JSON only, no markdown, no extra text.
"""

        # Groq API call করো
        response = client.chat.completions.create(
            model=settings.GROQ_MODEL,
            messages=[
                {
                    "role": "system",
                    "content": "You are a scam detection expert. Always respond with valid JSON only."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.1,
            max_tokens=500
        )

        # Response থেকে text বের করো
        result_text = response.choices[0].message.content.strip()

        # JSON parse করো
        result = json.loads(result_text)
        return result

    except json.JSONDecodeError:
        # JSON parse না হলে default return করো
        return {
            "risk_level": "MEDIUM",
            "risk_score": 50,
            "flags": ["analysis_error"],
            "explanation": "AI analysis এ সমস্যা হয়েছে, manual review করুন"
        }

    except Exception as e:
        return {
            "risk_level": "MEDIUM",
            "risk_score": 50,
            "flags": ["system_error"],
            "explanation": f"System error: {str(e)}"
        }