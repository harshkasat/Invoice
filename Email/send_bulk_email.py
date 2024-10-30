import smtplib
import mimetypes
from email.message import EmailMessage
from io import BytesIO
from Email import EMAIL_ADDRESS, EMAIL_PASSWORD, SUBJECT, BODY, SMTP_SERVER, SMTP_PORT

def send_email_with_attachment(to_address, task_id, file_content, file_name):
    """
    Send email with attachment from BytesIO object
    
    Args:
        to_address (str): Recipient email address
        task_id (str): Task identifier
        file_content (BytesIO): File content in BytesIO object
        file_name (str): Name of the attachment file
    """
    print(f"Sending email to {to_address} with attachment {file_name}, task_id {task_id}")
    # Ensure we're at the start of the BytesIO stream
    if isinstance(file_content, BytesIO):
        file_content.seek(0)
    else:
        raise TypeError("file_content must be a BytesIO object")

    # Create the email message
    msg = EmailMessage()
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = to_address
    msg['Subject'] = SUBJECT.format(task_id=task_id)
    msg.set_content(BODY.format(task_id=task_id))

    # Determine the MIME type of the file
    mime_type, _ = mimetypes.guess_type(file_name)
    if mime_type is None:
        # Default to application/octet-stream if type cannot be guessed
        mime_type = 'application/octet-stream'
    else:
        mime_type, mime_subtype = mime_type.split('/', 1)

    # Add the attachment to the email
    msg.add_attachment(
        file_content.read(),  # Use read() instead of getvalue()
        maintype=mime_type,
        subtype=mime_subtype if mime_type != 'application/octet-stream' else 'xlsx',
        filename=file_name
    )

    # Send the email using SMTP
    try:
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()  # Secure the connection
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.send_message(msg)
            print(f"Email sent successfully to {to_address}")
            return True
    except Exception as e:
        print(f"Failed to send email: {e}")
        return False