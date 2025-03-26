from DB import SessionLocal
from DB.model import PDF
from uuid import uuid4


def has_permsission(user, required_role):
    role_hierarchy = {
        "view": 1,
        "edit": 2,
        "admin": 3
    }
    return role_hierarchy[user.role] >= role_hierarchy[required_role]


class PDFModel:
    def __init__(self, user_id=None, pdf_name=None, pdf_link=None):
        self.user_id = user_id
        self.pdf_name = pdf_name
        self.pdf_link = pdf_link

    def list_pdfs_by_user_id(self):
        try:
            with SessionLocal() as session:
                pdfs = session.query(PDF).filter(PDF.user_id == self.user_id).all()
                if pdfs:
                    for pdf in pdfs:
                        print(f"PDF ID: {pdf.id} | PDF Link: {pdf.pdf_link} | Created At: {pdf.created_at}")
                    return pdfs
                else:
                    print("No PDFs found for this user", self.user_id)
                    return None
        except Exception as e:
            print(f"Error listing PDFs: {e}")
            return None

    def get_pdf_by_id(self, pdf_id):
        try:
            with SessionLocal() as session:
                pdf = session.query(PDF).filter(PDF.user_id == self.user_id,
                                                PDF.id == pdf_id).first()
                if pdf:
                    return pdf
                return None
        except Exception as e:
            print(f"Error getting PDF: {e}")
            return None

    def save_to_db(self):
        try:
            with SessionLocal() as session:
                pdf = PDF(
                    user_id=self.user_id,
                    pdf_name=self.pdf_name,
                    pdf_link=self.pdf_link
                )
                session.add(pdf)
                session.commit()
                # Check if PDF with same name or link exists for this user
                existing_pdf = session.query(PDF).filter(
                    PDF.user_id == self.user_id,
                    (PDF.pdf_name == self.pdf_name) | (PDF.pdf_link == self.pdf_link)
                ).first()

                if existing_pdf:
                    return {"message": "PDF with same name or link already exists"}

                # If no existing PDF found, save the new one
                pdf = PDF(
                    user_id=self.user_id,
                    pdf_name=self.pdf_name,
                    pdf_link=self.pdf_link
                )
                session.add(pdf)
                session.commit()
                return {"message": "PDF saved successfully", "pdf_id": str(pdf.id)}
        except Exception as e:
            print(f"Error details: {str(e)}")
            return {"message": f"Error saving PDF: {e}"}

    def delete_pdf(self, pdf_id, user):
        try:
            if not has_permsission(user, "edit"):
                return {"message": "Permission denied"}

            with SessionLocal() as session:
                pdf = session.query(PDF).filter(PDF.user_id == self.user_id,
                                                PDF.id == pdf_id).first()
                if pdf:
                    session.delete(pdf)
                    session.commit()
                    return {"message": "PDF deleted successfully"}
                return {"message": "PDF not found"}
        except Exception as e:
            return {"message": f"Error deleting PDF: {e}"}



    # @staticmethod
    # def get_pdf_by_id(pdf_id):
    #     with SessionLocal() as session:
    #         pdf = session.query(PDF).filter(PDF.id == pdf_id).first()
    #         if pdf:
    #             return pdf
    #         return None

    # @staticmethod
    # def get_all_pdfs():
    #     with SessionLocal() as session:
    #         pdfs = session.query(PDF).all()
    #         return pdfs

    # @staticmethod
    # def get_pdfs_by_user_id(user_id):
    #     with SessionLocal() as session:
    #         pdfs = session.query(PDF).filter(PDF.user_id == user_id).all()
    #         return pdfs

    # @staticmethod
    # def delete_pdf(pdf_id):
    #     with SessionLocal() as session:
    #         pdf = session.query(PDF).filter(PDF.id == pdf_id).first()
    #         if pdf:
    #             session.delete(pdf)
    #             session.commit()
    #             return {"message": "PDF deleted successfully"}
    #         return {"message": "PDF not found"}

    # @staticmethod
    # def update_pdf(pdf_id, pdf_link):
    #     with SessionLocal() as session:
    #         pdf = session.query(PDF).filter(PDF.id == pdf_id).first()
    #         if pdf:
    #             pdf.pdf_link = pdf_link
    #             session.commit()
    #             return {"message": "PDF updated successfully"}
    #         return {"message": "PDF not found"}

# if __name__ == "__main__":
#     # Create a valid UUID for testing
#     test_user_id = uuid4()

#     pdf_model = PDFModel(
#         user_id='b9ff9107-ef7f-48f8-9944-5c807be24d6f',  # Using valid UUID instead of "123"
#         pdf_name='Sugarlab Proposal.pdf',
#         pdf_link='https://res.cloudinary.com/debxcs6le/raw/upload/v1742900547/123/a3svhfsqonwdf3saomk6.pdf'
#     )
#     result = pdf_model.save_to_db()
#     print(result)
    # pdf_model.delete_pdf(pdf_id="123")
    # pdf_model.get_pdf_by_id(pdf_id="123")
    # print(pdf_model.list_pdfs_by_user_id())
    # pdf_model.get_pdfs_by_user_id(user_id="123")
    # pdf_model.update_pdf(pdf_id="123", pdf_link="new link")