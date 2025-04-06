from DB import SessionLocal
from DB.model import PDF

def task_success(public_id:str):
    # divide the public id into userd_id/filename and we want user_id
    try:
        user_id = public_id.split('/')[0]
        with SessionLocal() as session:
            pdf = session.query(PDF).filter(PDF.user_id == user_id).first()
            pdf.task_status = True
            session.commit()
        print("Task is successfully done")
    except Exception as e:
        print("Got error when running task_success: ", e)

# if __name__ == '__main__':
#     public_id = '925e0e38-565f-463a-b5b8-1fe0aab58fb3/invoice (1).pdf'
#     task_success(public_id=public_id)