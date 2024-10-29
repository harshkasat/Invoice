from Llm.config import ApiClient
from ProcessInvoice.invoice_model import Schema

# For Demo purposes, we are using a JSON schema for invoice information
schema = Schema(suffix='.json').schema()


PROMPT = 'You are tasked with extracting information from an invoice document and returning the data in a structured JSON format.'

def process_invoice(text:str)->dict:
    try:
        if text is not None:
            content = [text, PROMPT]
            result = ApiClient().generate_content(contents=content, schema=schema)
            return result.text
        else:
            print("Text is None")
            return None
    except Exception as e:
        print(f"Error processing invoice: {e}")

