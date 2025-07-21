import functions_framework
import openai
import os
from flask import jsonify, request
from format_midjourney import format_midjourney_prompt
from format_veo import format_veo_prompt
from log_firestore import log_to_firestore
from log_sheets import log_to_google_sheets

openai.api_key = os.getenv("OPENAI_API_KEY")

SYSTEM_PROMPT = """You are RICOPEKA, a cinematic animation assistant. Respond in creative and structured formats, supporting both story logic and visual detail. Integrate character consistency from JSON data when needed."""

@functions_framework.http
def ricopeka_ai(request):
    try:
        data = request.get_json()
        user_input = data.get("message", "")
        mode = data.get("mode", "default")

        messages = [{"role": "system", "content": SYSTEM_PROMPT}]
        messages.append({"role": "user", "content": user_input})

        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=messages,
            temperature=0.7,
            max_tokens=1000
        )

        gpt_reply = response.choices[0].message["content"]

        formatted = {}
        if mode == "midjourney":
            formatted = format_midjourney_prompt(gpt_reply)
        elif mode == "veo":
            formatted = format_veo_prompt(gpt_reply)

        log_to_firestore(user_input, gpt_reply, mode)
        log_to_google_sheets(user_input, gpt_reply, mode)

        return jsonify({"reply": gpt_reply, "formatted": formatted})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
