from Llm.config import ApiClient

from ProcessInvoice.parsed_docs import ParsedDocs
from ProcessInvoice.invoice_model import Schema


# For Demo purposes, we are using a JSON schema for invoice information
schema = Schema(suffix='.json').schema()

PROMPT = 'You are tasked with extracting information from an invoice document and returning the data in a structured JSON format.'

def main():
    # Load the PDF document and parse it
    pdf_docs = "invoice.pdf"
    parsed_docs = ParsedDocs()
    text = parsed_docs._parse_docs(pdf_docs)
    content = [text, PROMPT]


    result = ApiClient().generate_content(contents=content, schema=schema)
    print(result.text)
    

    
    # Validate the extracted information against the JSON schema
    if result:
        print("Invoice information extracted and validated successfully.")
    else:
        print("Failed to extract or validate invoice information.")


if __name__ == "__main__":
    main()