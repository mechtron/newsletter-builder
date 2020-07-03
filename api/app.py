import json
import os

from flask import Flask, redirect, request, url_for
import requests


app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY") or os.urandom(24)


@app.route("/generate-newsletter")
def login():
    return """
    {"status": "hi!"}
    """


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="8000")
