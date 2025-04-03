from CloudStorage.utils import CloudinaryStorage
from DB.db_operations import PDFModel, UserManager


class PDFService:

    def __init__(self):
        self.cloud_storage = CloudinaryStorage()

    def list_pdfs_by_user_id(self, user_id):
        try:
            pdf_model = PDFModel(user_id=user_id)
            return pdf_model.list_pdfs_by_user_id()
        except Exception as e:
            print(f"Error listing PDFs: {e}")
            return None

    def save_pdf(self, user_id, file_path, file_name):
        try:

            result = self.cloud_storage.upload_to_cloudinary(
                file_path=file_path,
                folder_name=user_id,
                display_name=file_name)
            print("this save_pdf func",type(result))
            if isinstance(result, dict):
                exists_file = result['result']
                return exists_file['secure_url'], exists_file['public_id'], exists_file['display_name']
            if result is None:
                return {"error": "Failed to upload file"}

            secure_url, public_id, original_filename = result
            pdf_model = PDFModel(user_id=user_id,
                               pdf_name=original_filename,
                               pdf_link=secure_url)
            pdf_model.save_to_db()
            return secure_url, public_id, original_filename
        except Exception as e:
            print(f"Error saving PDF: {e}")
            return {"error": str(e)}

    def delete_pdf(self, user_id, pdf_name):
        try:
            result = self.cloud_storage.delete_file_from_cloudinary(
                display_name=pdf_name,
                folder_name=user_id
            )
            PDFModel(user_id=user_id).delete_pdf(
                pdf_name=pdf_name
            )
        except Exception as e:
            print(f"Error occur while deleting the pdf file")
            return {
                "error": str(e)
            }



# if __name__ == "__main__":
#     import time
#     start = time.time()
#     user = UserManager(username='test', user_email='test@test.com')  # Use Role enum
#     response = user.create_user()
#     pdf_service = PDFService()
#     pdf_service.save_pdf(user_id=response['user_id'],
#                     file_path="C:/Users/Zedmat/Downloads/Sugarlab Proposal.pdf",
#                     file_name="Sugarlab Proposal.pdf")
#     pdf_service.list_pdfs_by_user_id(user_id=response['user_id'])
#     print('endtime', time.time() - start)
    # pdf_service.list_pdfs_by_user_id(user_id="b9ff9107-ef7f-48f8-9944-5c807be24d6f")
