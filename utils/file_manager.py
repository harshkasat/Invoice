from CloudStorage.utils import CloudinaryStorage
from DB.db_operations import PDFModel


class PDFService:

    def __init__(self):
        # self.user_id = user_id
        # self.pdf_public_id = pdf_public_id
        # self.pdf_link = pdf_link
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
            # if pdf_model done then save to cloudinary
            cloud_storage = CloudinaryStorage()
            secure_url, public_id, original_filename = cloud_storage.upload_to_cloudinary(
                file_path=file_path,
                folder_name=user_id,
                display_name=file_name)
            print(f"Secure URL: {secure_url} | Public ID: {public_id} | Original Filename: {original_filename}")
            # after saving to cloudinary, save to db
            pdf_model = PDFModel(user_id=user_id,
                                pdf_public_id=public_id,
                                pdf_link=secure_url)

            return pdf_model.save_to_db(file_name=original_filename)
        except Exception as e:
            print(f"Error saving PDF: {e}")
            return None


if __name__ == "__main__":
    pdf_service = PDFService()
    # pdf_service.list_pdfs_by_user_id(user_id="123")
    pdf_service.save_pdf(user_id="123",
                    file_path="C:/Users/Zedmat/Downloads/Sugarlab Proposal.pdf",
                    file_name="Sugarlab Proposal.pdf")
