from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from Router import task_status, upload_invoice
import uvicorn

# app = FastAPI(docs_url=None, redoc_url=None)
app = FastAPI()

print("Starting FastAPI server...")
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000', 'https://invoice-kappa-eight.vercel.app'],  # Use only the origin
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/")
async def root():
    return {"message": "Invoice Parser is running."}

@app.get("/health")
async def health():
    return {"message": "Invoice Parser is healthy."}

app.include_router(task_status.router)
app.include_router(upload_invoice.router)


if __name__ == "__main__":
    uvicorn.run('app:app', reload=True, host="0.0.0.0", port=8000, log_level="info")