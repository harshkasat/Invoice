import boto3
import os
import boto3.resources
from botocore.exceptions import ClientError
import logging
from io import BytesIO
from dotenv import load_dotenv

load_dotenv()

# Specify the bucket name you wish to create
s3 = boto3.resource(
    service_name=os.getenv('SERVICE_NAME'),
    region_name=os.getenv('REGION_NAME'),
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY')  # replace with your actual AWS credentials
)
BUCKET_NAME = os.getenv('BUCKET_NAME')
s3_client = s3.meta.client  # Get the S3 client from the resource

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