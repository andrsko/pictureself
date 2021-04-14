from flask import Flask, jsonify
import os
from flask_cors import CORS


app = Flask(__name__)


# CORS

cors_allowed_origins_env = os.environ.get("CORS_ALLOWED_ORIGINS")

CORS_ALLOWED_ORIGINS = (
    json.loads(cors_allowed_origins_env)
    if cors_allowed_origins_env
    else [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]
)

CORS(app, resources={r"/*": {"origins": CORS_ALLOWED_ORIGINS}})


@app.route("/")
def hello_world():
    return jsonify({"message": "Hello, World!"})
