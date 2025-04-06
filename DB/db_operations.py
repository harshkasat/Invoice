from DB import SessionLocal
from DB.model import PDF, User, Role  # Add Role import
from uuid import uuid4
from typing import Optional


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
            pdf_list = []
            with SessionLocal() as session:
                pdfs = session.query(PDF).filter(PDF.user_id == self.user_id).all()
                if pdfs:
                    for pdf in pdfs:
                        pdf_list.append({
                            "id": str(pdf.id),
                            "name": pdf.pdf_name,
                            "link": pdf.pdf_link,
                            "folder": "Documents",
                            "task_status":bool(pdf.task_status),
                            "created_at": str(pdf.created_at)
                        })
                    return pdf_list
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
                # pdf = PDF(
                #     user_id=self.user_id,
                #     pdf_name=self.pdf_name,
                #     pdf_link=self.pdf_link
                # )
                # session.add(pdf)
                # session.commit()
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
                    pdf_link=self.pdf_link,
                )
                # Get the user and update their credit
                user = session.query(User).filter(User.id == self.user_id).first()
                if not user:
                    return {"message": "User not found"}
                if user.credit <= 0:
                    return {"message": "Insufficient credit"}

                # Deduct 1 credit for saving PDF
                user.credit -= 1
                session.add(user)
                session.add(pdf)
                session.commit()
                return {"message": "PDF saved successfully", "pdf_id": str(pdf.id)}
        except Exception as e:
            print(f"Error details: {str(e)}")
            return {"message": f"Error saving PDF: {e}"}

    def delete_pdf(self, pdf_name):
        try:
            with SessionLocal() as session:
                pdf = session.query(PDF).filter(PDF.user_id == self.user_id,
                                                PDF.pdf_name == pdf_name).first()
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
            print(existing_user)
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

    def delete_user(self, user_id):
        try:
            with SessionLocal() as session:
                # First check if user exists
                user = session.query(User).filter(User.id == user_id).first()
                if not user:
                    return {"message": "User not found"}

                # Delete all PDFs associated with this user
                pdfs = session.query(PDF).filter(PDF.user_id == user.id).all()
                for pdf in pdfs:
                    session.delete(pdf)

                # Now delete the user
                session.delete(user)
                session.commit()

                return {
                    "message": "User and all associated PDFs deleted successfully",
                    "pdfs_deleted": len(pdfs)
                }
        except Exception as e:
            session.rollback()  # Rollback in case of error
            return {"message": f"Error deleting user: {e}"}

    def list_users_by_role(self, role:Optional[Role.VIEW]):
        try:
            with SessionLocal() as session:
                users = session.query(User).filter(User.role == role).all()
                if users:
                    return [{"id": str(user.id), "username": user.username, "email": user.user_email} for user in users]
                return []
        except Exception as e:
            print(f"Error listing users: {e}")
            return []

    def list_view_and_edit_users(self):
        try:
            view_users = self.list_users_by_role(Role.VIEW)
            edit_users = self.list_users_by_role(Role.EDIT)
            return {
                "view_users": view_users,
                "edit_users": edit_users
            }
        except Exception as e:
            print(f"Error listing users: {e}")
            return {"view_users": [], "edit_users": []}

    def get_user_info(self, user_id:str):
        try:
            with SessionLocal() as session:
                user_info = session.query(User).filter(User.id == user_id).first()
                return {
                    "username":user_info.username,
                    "email":user_info.user_email
                }
        except Exception as e:
            print(f"Error checking user: {e}")
            return None

    def check_credit_limit(self, user_id:str):
        try:
            with SessionLocal() as session:
                user_info = session.query(User).filter(User.id == user_id).first()
                return {
                    "creditLeft":user_info.credit
                }
        except Exception as e:
            print(f"Error when checking limit: {e}")


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