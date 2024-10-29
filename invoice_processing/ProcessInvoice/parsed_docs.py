from PyPDF2 import PdfReader
from PIL import Image 
from pytesseract import pytesseract 



import os
from dotenv import load_dotenv
load_dotenv()


genai_api_key = os.getenv('GEMINI_API_KEY')
os.environ['GOOGLE_API_KEY'] = os.getenv('GEMINI_API_KEY')
if genai_api_key is None:
    raise ValueError("Missing GEMINI_API_KEY environment variable")

import google.generativeai as genai

SAFE_SETTINGS = [
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_NONE",
    },
]


# Initialize the API client
def configure_llm(json_schema=None):
    try:
        genai.configure(api_key=genai_api_key)
        llm = genai.GenerativeModel('models/gemini-1.5-flash', 
                                safety_settings=SAFE_SETTINGS,
                                system_instruction=f"""You are tasked with parsing invoice documents and
                                    extracting specific details. The extracted information should be structured into the following fields:
                                    Using this JSON schema:
                                    InvoiceInfo = {json_schema}
                                    Return a `list[InvoiceInfo]`""",
                                    generation_config={"response_mime_type": "application/json"})
        if llm is None:
            raise ValueError("LLM component is None")
        return llm
    except Exception as e:
        print(f"Failed to configure LLM: {e}")
        return None


prompt = 'You are tasked with extracting information from an invoice document and returning the data in a structured JSON format.'


class ParsedDocs(object):

    def get_pdf_text(self, pdf_path):
        try:
            text = ""
            pdf_reader = PdfReader(pdf_path)
            for page in pdf_reader.pages:
                text += page.extract_text()
            return text
        except Exception as e:
            print(f"Error processing Pdf document: {e}")
            return None

    def get_img_text(self, img_path):
        try:
            img = Image.open(img_path)
            text = pytesseract.image_to_string(img)
            return text[:-1]
        except Exception as e:
            print(f"Error processing image document: {e}")
            return None

    def _parse_docs(self, doc_path):
        doc_type = doc_path.split('.')[-1]
        if doc_type == 'pdf':
            return self.get_pdf_text(doc_path)
        elif doc_type in ['png', 'jpg']:
            return self.get_img_text(doc_path)
        else:
            return None


# pdf_content = ParsedDocs.get_pdf_text('Z:/Invoice/invoice_processing/ProcessInvoice/sample-invoice.pdf')
# content = [pdf_content, prompt]

# llm = configure_llm(json_schema=json_schema)

# result = llm.generate_content(contents=content)

# print(result.text)  