from flask import Flask, request, jsonify
import requests
import os

app = Flask(name)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

@app.route("/analyze", methods=["POST"])
def analyze():

data = request.json
text = data.get("text","")

url = (
    "https://generativelanguage.googleapis.com/"
    f"v1beta/models/gemini-2.5-flash:generateContent"
    f"?key={GEMINI_API_KEY}"
)

body = {
    "contents":[
        {
            "parts":[
                {
                    "text": text
                }
            ]
        }
    ]
}

response = requests.post(
    url,
    json=body
)

return jsonify(
    response.json()
)

@app.route("/")
def home():

return "Kavach Backend Running"

if name=="main":

app.run(
    host="0.0.0.0",
    port=5000,
    debug=True
)
