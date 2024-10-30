from AwsService import s3_client, BUCKET_NAME
from botocore.exceptions import ClientError
import logging
from io import BytesIO


def upload_file_to_s3(file_content, s3_key):
    try:
        if isinstance(file_content, BytesIO):
            s3_client.upload_fileobj(file_content, Bucket=BUCKET_NAME, Key=s3_key)
        else:
            s3_client.upload_file(file_content, Bucket=BUCKET_NAME, Key=s3_key)
    except ClientError as e:
        logging.error(e)    
        return False
    return True

def get_file_from_s3(s3_key):
    try:
        response = s3_client.get_object(Bucket=BUCKET_NAME, Key=s3_key)  # Use the client here
        return response['Body'].read()
    except ClientError as e:
        logging.error(e)
        return None

def delete_file_from_s3(s3_key):
    try:
        s3_client.delete_object(Bucket=BUCKET_NAME, Key=s3_key)
    except ClientError as e:
        logging.error(e)
        return False
    return True