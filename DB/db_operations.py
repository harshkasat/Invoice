from DB import SessionLocal
from DB.model import PDF, User, Role  # Add Role import
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


class UserManager:
    def __init__(self, role=None, username=None, user_email=None):
        self.role = role or Role.VIEW  # Use Role enum instead of string
        self.username = username
        self.user_email = user_email

    def get_user_by_email(self, email):
        try:
            with SessionLocal() as session:
                return session.query(User).filter(User.user_email == email).first()
        except Exception as e:
            print(f"Error checking user: {e}")
            return None

    def create_user(self):
        try:
            # Check if user already exists
            existing_user = self.get_user_by_email(self.user_email)
            if existing_user:
                return {
                    "message": f"User with email {self.user_email} already exists",
                    "user_id": str(existing_user.id),
                    "username": existing_user.username
                }

            with SessionLocal() as session:
                new_user = User(
                    username=self.username,
                    user_email=self.user_email,
                    role=self.role
                )
                session.add(new_user)
                session.commit()
                return {
                    "message": "User created successfully",
                    "user_id": str(new_user.id),
                    "username": new_user.username,
                }
        except Exception as e:
            return {"message": f"Error creating user: {e}"}


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
# if __name__ == '__main__':
#     user = UserManager(username='test', user_email='test@test.com', role=Role.VIEW)  # Use Role enum
#     response = user.create_user()
#     print(response['message'])
#     print(response['user_id'])
#     print(response['username'])
#     pdf_model = PDFModel(
#         user_id=response['user_id'],
#         pdf_name='Sugarlab Proposal.pdf',
#         pdf_link=None
#     )
#     result = pdf_model.save_to_db()
#     print(result)