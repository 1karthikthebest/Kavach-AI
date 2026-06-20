from flask import Flask,request,jsonify
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app=Flask(__name__)

KEY=os.getenv("GEMINI_API_KEY")

@app.route("/analyze",methods=["POST"])

def analyze():

 data=request.json

 url=(
 f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={KEY}"
 )

 r=requests.post(
 url,
 json={
 "contents":[
 {
 "parts":[
 {
 "text":data["text"]
 }
 ]
 }
 ]
 }
 )

 return jsonify(r.json())

if __name__=="__main__":
 app.run()
