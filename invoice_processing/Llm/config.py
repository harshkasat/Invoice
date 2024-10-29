import google.generativeai as genai
from Llm import genai_api_key

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
class ApiClient():
    def configure_llm(self, schema=None):
        try:
            genai.configure(api_key=genai_api_key)
            llm = genai.GenerativeModel('models/gemini-1.5-flash',
                        system_instruction=f"""You are tasked with parsing invoice documents and
                        extracting specific details.
                        Use schema {schema}
                        return a `list[InvoiceInfo]`""")            

            if llm is None:
                raise ValueError("LLM component is None")
            return llm
        except Exception as e:
            print(f"Failed to configure LLM: {e}")
            return None

    def generate_content(self, contents, schema=None):
        try:
            llm = self.configure_llm(schema=schema)
            response = llm.generate_content(contents=contents,
                        safety_settings=SAFE_SETTINGS,
                        generation_config=genai.GenerationConfig(
                            response_mime_type="application/json",
                        ))
            return response
        except Exception as e:
            print(f"Failed to generate content: {e}")
            return None