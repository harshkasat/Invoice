import os
from dotenv import load_dotenv
from celery import Celery
load_dotenv()

print("Starting Celery worker...")

celery_app = Celery(
    'tasks', 
    broker=os.getenv('REDIS_BROKER_URL'),
    backend=os.getenv('REDIS_BROKER_URL'))


celery_app.conf.worker_pool = 'solo'
celery_app.autodiscover_tasks(['Celery.celery_worker'])
celery_app.config_from_object('celeryconfig')
