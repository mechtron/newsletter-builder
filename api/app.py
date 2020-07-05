import json
import os
from pathlib import Path

from flask import Flask, send_file, request
from flask_cors import CORS

from newsletter_images import (
    download_newsletter_images,
    zip_newsletter_images,
    delete_temporary_folder,
)


app = Flask(__name__)
CORS(app, resources={r"/generate-newsletter": {"origins": "*"}})


@app.route("/generate-newsletter", methods=["POST"])
def generate_newsletter():
    request_data = json.loads(request.data)
    downloaded_images_path = download_newsletter_images(
        request_data["newsletter_data"],
        request_data["newsletter_id"],
    )
    zip_path = zip_newsletter_images(downloaded_images_path)
    delete_temporary_folder(downloaded_images_path)
    zip_file_name = Path(zip_path).name
    return send_file(
        zip_path,
        mimetype="application/zip",
        as_attachment=True,
        attachment_filename=zip_file_name,
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="8000")
