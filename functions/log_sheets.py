import gspread
from oauth2client.service_account import ServiceAccountCredentials
from datetime import datetime

def log_to_google_sheets(prompt, reply, mode):
    scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
    creds = ServiceAccountCredentials.from_json_keyfile_name("credentials.json", scope)
    client = gspread.authorize(creds)

    sheet = client.open("RICOPEKA Prompt Log").sheet1
    sheet.append_row([datetime.utcnow().isoformat(), prompt, reply, mode])
