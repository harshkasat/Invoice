import io
import json
import os
import tempfile
import zipfile
from typing import List

from dotenv import load_dotenv

from celery import Celery

load_dotenv()

from AwsService.s3_utils import get_file_from_s3, delete_file_from_s3
from ProcessInvoice.process_file import process_single_file
from ProcessInvoice.convert_xlsx import _convert_xlsx
from ProcessInvoice.process_zipfile import process_zip
from Email.send_bulk_email import send_email_with_attachment



celery_app = Celery('tasks', broker=os.getenv('REDIS_BROKER_URL'), backend=os.getenv('REDIS_BROKER_URL'))
celery_app.conf.worker_pool = 'solo'



@celery_app.task
def process_file_task(s3_key: str, email: str) -> dict:
    print(f"Processing file: {email}")
    try:
        file_content = get_file_from_s3(s3_key)
        
        if s3_key.endswith('.zip'):
            results = process_zip(file_content)
        else:
            results = [process_single_file(file_content, s3_key)]
        

        # Combine results and upload to S3
        combined_result = {"results": results}
        if combined_result:
            result_key = f"results/{process_file_task.request.id}.xlsx"
            xlsx_file_content = _convert_xlsx(json_file=combined_result)
            send_email_with_attachment(to_address=email, task_id=process_file_task.request.id, file_content=xlsx_file_content, file_name='invoice_report.xlsx')
            
            return {"message": "Processing completed", "result_key": result_key}
        else:
            return {"message": "Processing completed", "result_key": None}
    except Exception as e:  # Catch any exceptions that occur during processing
        print(f"Error processing file celery task: {e}")  # Log the error

    finally:
        delete_file_from_s3(s3_key)
