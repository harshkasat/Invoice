import os
import requests
import tempfile
from typing import Optional
import requests

from Validator.json_validator import validate_json
from ProcessInvoice.parsed_docs import ParsedDocs
from ProcessInvoice.process_invoice import process_invoice

def process_single_file(file_content: str, file_name:str) -> dict:

    # Download the file from the URL
    response = requests.get(file_content, timeout=20)
    if response.status_code == 200:
        # Create a temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file_name)[1]) as temp_file:
            temp_file.write(response.content)
            temp_file_path = temp_file.name

        try:
            # Parse the document
            parsed_docs = ParsedDocs()
            if file_name.lower().endswith(('.pdf', '.jpg', '.jpeg', '.png', '.tiff', '.bmp')):
                text = parsed_docs._parse_docs(temp_file_path)
            else:
                raise ValueError("Unsupported file format")

            invoice_info = process_invoice(text=text)
            response = validate_json(json_data=invoice_info)
            if response:
                return response
        except Exception as e:
            print({"message": f"Error processing file: {e}"})
            return None
    else:
        print({"message": f"Failed to download file, status code: {response.status_code}"})
        return None