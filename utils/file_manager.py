from CloudStorage.utils import CloudinaryStorage
from DB.db_operations import PDFModel, UserManager


class PDFService:

    def __init__(self):
        pass

    def list_pdfs_by_user_id(self, user_id):
        try:
            pdf_model = PDFModel(user_id=user_id)
            return pdf_model.list_pdfs_by_user_id()
        except Exception as e:
            print(f"Error listing PDFs: {e}")
            return None

    def save_pdf(self, user_id, file_path, file_name):
        try:
            cloud_storage = CloudinaryStorage()
            result = cloud_storage.upload_to_cloudinary(
                file_path=file_path,
                folder_name=user_id,
                display_name=file_name)

            if isinstance(result, str):
                return {"info": 'File already exists'}
            if result is None:
                return {"error": "Failed to upload file"}

            secure_url, public_id, original_filename = result
            pdf_model = PDFModel(user_id=user_id,
                               pdf_name=original_filename,
                               pdf_link=secure_url)

            return pdf_model.save_to_db()
        except Exception as e:
            print(f"Error saving PDF: {e}")
            return {"error": str(e)}


if __name__ == "__main__":
    import time
    start = time.time()
    user = UserManager(username='test', user_email='test@test.com')  # Use Role enum
    response = user.create_user()
    pdf_service = PDFService()
    pdf_service.save_pdf(user_id=response['user_id'],
                    file_path="C:/Users/Zedmat/Downloads/Sugarlab Proposal.pdf",
                    file_name="Sugarlab Proposal.pdf")
    pdf_service.list_pdfs_by_user_id(user_id=response['user_id'])
    print('endtime', time.time() - start)
    # pdf_service.list_pdfs_by_user_id(user_id="b9ff9107-ef7f-48f8-9944-5c807be24d6f")
