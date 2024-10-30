from PyPDF2 import PdfReader
from PIL import Image 
from pytesseract import pytesseract 


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