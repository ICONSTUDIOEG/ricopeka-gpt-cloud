def format_veo_prompt(text):
    return {
        "scene_description": text.strip(),
        "camera": "dynamic tracking",
        "style": "Pixar-style 3D animation",
        "lens": "50mm",
        "aspect_ratio": "16:9"
    }
