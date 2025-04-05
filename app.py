import os
from dotenv import load_dotenv

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from Router import upload_invoice, task_status, db_route

load_dotenv()



if os.getenv('LOCAL_HOST'):
    app = FastAPI()
else:
    app = FastAPI(docs_url=None,
                  redoc_url=None)


print("Starting FastAPI server...")
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000', 'https://invoice.cognitodev.space/'],  # Use only the origin
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)


@app.get("/")
async def root():
    return {"message": 'server is running'}


@app.get("/health")
async def health():
    return {"message": "Invoice Parser is healthy."}


PREFIX = '/api/v1'
app.include_router(
    task_status.router,
    prefix=PREFIX,
    tags=["Task Status"]
)

app.include_router(
    upload_invoice.router,
    tags=["Upload Invoice"],
    prefix=PREFIX
)

app.include_router(
    db_route.router,
    prefix=PREFIX
)


# if __name__ == "__main__":
#     uvicorn.run('app:app', reload=True, host="0.0.0.0", port=8000, log_level="info")

# For Vercel deployment
app = app
