def format_midjourney_prompt(text):
    return {
        "prompt": f"{text.strip()} --v 5 --ar 16:9 --style cinematic"
    }
