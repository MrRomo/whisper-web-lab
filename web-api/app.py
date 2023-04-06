from flask import Flask, abort, request
from flask_cors import CORS
from datetime import datetime
from tempfile import NamedTemporaryFile
import torch
import whisper
import os
from uuid import uuid4
import json

# Check if NVIDIA GPU is available
torch.cuda.is_available()
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
print("Using device:", DEVICE)

# Load the Whisper model:
model = whisper.load_model("base", device=DEVICE)

app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "*"}})


@app.route("/")
def hello():
    return "Whisper Hello World!"


@app.route('/whisper_local', methods=['POST'])
def handler_local():
    if not request.files:
        # If the user didn't submit any files, return a 400 (Bad Request) error.
        abort(400)

    # For each file, let's store the results in a list of dictionaries.
    results = None

    # Loop over every file that the user submitted.
    for filename, handle in request.files.items():
        # Create a temporary file.
        # The location of the temporary file is available in `temp.name`.
        temp = NamedTemporaryFile()
        # Write the user's uploaded file to the temporary file.
        # The file will get deleted when it drops out of scope.
        temp = NamedTemporaryFile()
        # Write the user's uploaded file to the temporary file.
        # The file will get deleted when it drops out of scope.
        handle.save(temp)
        # Let's get the transcript of the temporary file.
        result = model.transcribe(temp.name)
        # Now we can store the result object for this file.
        print(result)
        results = {
            'filename': filename,
            'transcript': result['text'],
            'language': result['language'],
            'date': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        }

    # This will be automatically converted to JSON.
    return {'results': results}

