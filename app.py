from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from Router import task_status, upload_invoice

app = FastAPI()

print("Starting FastAPI server...")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
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
