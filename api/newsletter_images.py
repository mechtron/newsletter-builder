#! /usr/bin/env python3
import datetime
import os
import json
import pathlib
import shutil
import tempfile

from requests import get


def load_json_file(json_file_path):
    with open(json_file_path) as json_file:
        data = json.load(json_file)
        print("Successfully loaded {} newsletters", len(data))
        return data


def download_image(image_url, image_filename, destination_base_path):
    if (image_filename == "" or image_filename == None):
        image_filename = image_url.split("/")[-1]
    destination_path = "{}/{}".format(destination_base_path, image_filename)
    with open(destination_path, "wb") as file:
        response = get(image_url)
        file.write(response.content)
        print("Downloaded to", destination_path)
    return destination_path


def download_newsletter_images(newsletter_data, newsletter_id):
    destination_dirname = "newsletter_{newsletter_id}_images_{timestamp}".format(
        newsletter_id=newsletter_id,
        timestamp=datetime.datetime.now().timestamp(),
    )
    destination_base_path = "{}/{}".format(tempfile.gettempdir(), destination_dirname)
    os.mkdir(destination_base_path)
    for article in newsletter_data["articles"]:
        if "image_url" in article and article["image_url"] not in (None, ""):
            download_image(
                article["image_url"],
                article["image_filename"],
                destination_base_path,
            )
    print("Downloaded images are available at:", destination_base_path)
    return destination_base_path


def zip_newsletter_images(downloaded_images_path):
    destination_filename = downloaded_images_path.split("/")[-1]
    destination_path = str(pathlib.Path(__file__).parent) + "/" + destination_filename
    shutil.make_archive(destination_path, "zip", downloaded_images_path)
    print("Newsletter image zip:", destination_path + ".zip")
    return destination_path + ".zip"


def delete_temporary_folder(downloaded_images_path):
    shutil.rmtree(downloaded_images_path)
    print("Successfully cleaned-up", downloaded_images_path)


def main():
    json_file_path = os.environ.get("JSON_DATA_PATH")
    print("Attempting to load JSON file from ", json_file_path)
    newsletter_data = load_json_file(json_file_path)
    selected_newsletter = os.environ.get("SELECTED_NEWSLETTER", None)
    if not selected_newsletter:
        selected_newsletter = len(newsletter_data) - 1
    downloaded_images_path = download_newsletter_images(
        newsletter_data[selected_newsletter],
        selected_newsletter,
    )
    zip_newsletter_images(downloaded_images_path)
    delete_temporary_folder(downloaded_images_path)


if __name__ == "__main__":
    main()
