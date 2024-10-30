from dotenv import load_dotenv
import os

load_dotenv()

# Email credentials
EMAIL_ADDRESS = os.getenv('EMAIL_ADDRESS')
EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')
SMTP_SERVER = os.getenv('SMTP_SERVER')  # e.g., 'smtp.gmail.com'
SMTP_PORT = os.getenv('SMTP_PORT')  # e.g., 587 for Gmail

SUBJECT = "Your Requested Invoice Data in XLSX Format – Task ID: {task_id}"
BODY = """
Hello,

As requested, we have successfully converted your provided invoice PDF into an Excel (.xlsx) format. 
Attached, you will find the parsed data from your invoice for Task ID: {task_id}.

This XLSX file contains detailed invoice information, including item descriptions, quantities, total amounts, and relevant tax details. 
If you have any questions or need further assistance, please feel free to reach out.

Thank you for choosing our service.

Best regards,  
Invoice Parser 
"""