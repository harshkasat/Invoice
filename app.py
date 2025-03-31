import os
import requests
from dotenv import load_dotenv
from fastapi import FastAPI, Depends, status, Response
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from typing import Annotated, Dict
import jwt
from jwt import PyJWKClient
from fastapi.middleware.cors import CORSMiddleware
from Router import upload_invoice, task_status, db_route
from middleware import JWTAuthMiddleware

load_dotenv()

JWKS_URL = "https://concrete-duckling-78.clerk.accounts.dev/.well-known/jwks.json"
jwks_client = PyJWKClient(JWKS_URL)

security = HTTPBearer()


if os.getenv('LOCAL_HOST'):
    app = FastAPI()
else:
    app = FastAPI(docs_url=None,
                  redoc_url=None)


print("Starting FastAPI server...")
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000', 'https://invoice-kappa-eight.vercel.app'],  # Use only the origin
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)


@app.get("/")
async def root(payload: dict = Depends(JWTAuthMiddleware())):
    return {"message": payload}

@app.post("/user/")
async def temp_user(params:int, payload:dict=Depends(JWTAuthMiddleware())):
    return {
        "user":params,
        "payload":payload
    }

@app.get("/health")
async def health():
    return {"message": "Invoice Parser is healthy."}


prefix = '/api/v1'
app.include_router(task_status.router, prefix=prefix)
app.include_router(upload_invoice.router, prefix=prefix)
app.include_router(db_route.router, prefix=prefix)


# if __name__ == "__main__":
#     uvicorn.run('app:app', reload=True, host="0.0.0.0", port=8000, log_level="info")
