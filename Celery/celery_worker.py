from CloudStorage.utils import CloudinaryStorage
from ProcessInvoice.process_file import process_single_file
from ProcessInvoice.convert_xlsx import _convert_xlsx
from ProcessInvoice.process_zipfile import process_zip
from Email.send_bulk_email import send_email_with_attachment
from Celery import celery_app
from utils.task_status import task_success


cloud_storage = CloudinaryStorage()

@celery_app.task(name='Celery.celery_worker.process_file_task')
def process_file_task(public_id: str, email: str) -> dict:
    try:
        file_link, file_name = cloud_storage.get_files_from_cloudinary(public_id=public_id)
        print(f"Processing file: {file_name}")

        if file_link.endswith('.zip'):
            results = process_zip(file_link)
        else:
            results = [process_single_file(file_link, file_name)]

        # Combine results and upload to S3
        combined_result = {"results": results}
        if combined_result:
            result_key = f"results/{process_file_task.request.id}.xlsx"
            xlsx_file_content = _convert_xlsx(json_file=combined_result)
            send_email_with_attachment(to_address=email,
                                       task_id=process_file_task.request.id,
                                       file_content=xlsx_file_content,
                                       file_name='invoice_report.xlsx')

            task_success(public_id=str(public_id))
            return {"message": "Processing completed", "result_key": result_key}
        else:
            return {"message": "Processing completed", "result_key": None}
    except Exception as e:  # Catch any exceptions that occur during processing
        print(f"Error processing file celery task: {e}")  # Log the error
        return {"message": "Error processing file", "error": str(e)}  # Return an error message
