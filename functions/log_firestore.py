from google.cloud import firestore
from datetime import datetime

def log_to_firestore(prompt, reply, mode):
    db = firestore.Client()
    doc_ref = db.collection("prompts").document()
    doc_ref.set({
        "prompt": prompt,
        "reply": reply,
        "mode": mode,
        "timestamp": datetime.utcnow().isoformat()
    })
