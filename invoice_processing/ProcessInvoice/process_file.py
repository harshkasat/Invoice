import tempfile
import os

from Validator.json_validator import validate_json
from ProcessInvoice.parsed_docs import ParsedDocs
from ProcessInvoice.process_invoice import process_invoice

def process_single_file(file_content: bytes, file_name: str) -> dict:
    # Create a temporary file
    with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file_name)[1]) as temp_file:
        temp_file.write(file_content)
        temp_file_path = temp_file.name

    try:
        # Parse the document
        parsed_docs = ParsedDocs()
        text = parsed_docs._parse_docs(temp_file_path)
        invoice_info = process_invoice(text=text)
        response = validate_json(json_data=invoice_info)
        if response:
            return response
        else:
            print({"message": "Error validating JSON response"})
            return None
        
    finally:
        # Clean up the temporary file
        os.unlink(temp_file_path)