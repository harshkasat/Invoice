# Invoice Parser README

## 1. Project Title and Short Description

**Invoice Parser:** A FastAPI-based application for parsing invoices using OCR and LLMs, storing the data in a PostgreSQL database, and sending results via email.

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)


## 2. Project Overview

This project provides a complete solution for automating invoice processing.  It leverages Optical Character Recognition (OCR) to extract text from various invoice formats (PDF, potentially others), utilizes a Large Language Model (LLM) to structure the extracted data, stores the processed information in a PostgreSQL database, and finally, sends the results to a specified email address.  The application is built using FastAPI for the backend, Celery for asynchronous task management, and a React frontend (partially included).

**Key Features:**

* **OCR and LLM Integration:**  Combines OCR (pytesseract) and Google's Generative AI for accurate and structured data extraction.
* **Asynchronous Processing:** Celery handles invoice processing in the background, preventing blocking operations.
* **Database Storage:**  Processed invoice data is stored securely in a PostgreSQL database using SQLAlchemy and psycopg2.
* **Email Notification:**  Users receive email notifications with processed invoice data in an Excel format.
* **Cloudinary Integration:**  Uses Cloudinary for file storage and management.
* **RESTful API:**  Provides a well-defined API for interacting with the application.
* **React Frontend (Partial):**  A basic React frontend is included for user interaction (upload and status checking).

**Problem Solved:**  Manual invoice data entry is time-consuming and error-prone. This application automates this process, saving time and improving accuracy.

**Use Cases:**

* Accounting departments
* Finance teams
* Businesses processing high volumes of invoices


## 3. Table of Contents

* [Prerequisites](#prerequisites)
* [Installation Guide](#installation-guide)
* [Configuration](#configuration)
* [Usage Examples](#usage-examples)
* [Project Architecture](#project-architecture)
* [API Reference](#api-reference)
* [Contributing Guidelines](#contributing-guidelines)
* [License](#license)


## 4. Prerequisites

* Python 3.7+
* PostgreSQL
* Node.js and npm (for the frontend)
* Cloudinary account (for file storage)
* Google Generative AI API Key


## 5. Installation Guide

**Backend:**

1. Clone the repository: `git clone https://github.com/harshkasat/Invoice.git`
2. Navigate to the project directory: `cd Invoice`
3. Install dependencies: `pip install -r requirements.txt`
4. Set up environment variables (see Configuration section).
5. Run migrations (if using the database):  *(Instructions missing from provided code)*
6. Run the FastAPI application: `uvicorn app:app --reload`


**Frontend:** *(Instructions missing from provided code, but likely involves npm install and build)*


## 6. Configuration

Create a `.env` file in the root directory and add the following environment variables:

* `DATABASE_URL`: Your PostgreSQL connection string.
* `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name.
* `CLOUDINARY_API_KEY`: Your Cloudinary API key.
* `CLOUDINARY_API_SECRET`: Your Cloudinary API secret.
* `GOOGLE_GENERATIVE_AI_API_KEY`: Your Google Generative AI API key.
* `LOCAL_HOST`: Set to `true` for local development, `false` for production.  This affects the Swagger UI.
*  *(Other environment variables may be required, not explicitly defined)*


## 7. Usage Examples

**Backend API:**

The API endpoints are defined in the `Router` directory.  For example, uploading an invoice would involve a POST request to `/api/v1/upload` (details missing from provided code).  The `/api/v1/task_status` endpoint allows checking the status of an invoice processing task.

**Frontend Usage:** *(Instructions missing from provided code)*


## 8. Project Architecture

The application follows a layered architecture:

* **Frontend (React):** Handles user interaction.
* **FastAPI Backend:**  Provides the RESTful API.
* **Celery Worker:** Processes invoices asynchronously.
* **ProcessInvoice Module:** Contains the core logic for invoice processing (OCR, LLM, data structuring).
* **CloudStorage Module:** Handles file uploads and retrieval using Cloudinary.
* **Database (PostgreSQL):** Stores processed invoice data.
* **Email Module:** Sends email notifications.


## 9. API Reference

*(Detailed API documentation is missing from the provided code.  The code shows endpoints for `/`, `/health`, `/api/v1/upload`, and `/api/v1/task_status`, but lacks detailed specifications.)*


## 10. Contributing Guidelines

*(Contributing guidelines are missing from the provided code.)*


## 11. Testing

*(Testing instructions are missing from the provided code.)*


## 12. Deployment

*(Deployment instructions are missing from the provided code.)*


## 13. Security

*(Security considerations are missing from the provided code.)*


## 14. Ethical Considerations

*(Ethical considerations are missing from the provided code.)*


## 15. Future Roadmap

*(Future roadmap is missing from the provided code.)*


## 16. License

MIT License


## 17. Acknowledgments

*(Acknowledgments are missing from the provided code.)*


## 18. Contact and Support

*(Contact information is missing from the provided code.)*


**Code Samples:**

**`celery_worker.py` (Partial):** This shows the Celery task for processing a file.

```python
@celery_app.task(name='Celery.celery_worker.process_file_task')
def process_file_task(public_id: str, email: str) -> dict:
    try:
        file_link, file_name = cloud_storage.get_files_from_cloudinary(public_id=public_id)
        # ... processing logic ...
    except Exception as e:
        # ... error handling ...
```

**`main.py` (Partial):** This demonstrates the LLM interaction for a single invoice.

```python
def main():
    # ... Load PDF and parse ...
    result = ApiClient().generate_content(contents=content, schema=schema)
    print(result.text)
```


This README provides a framework.  Significant portions need to be filled in based on the complete implementation details of the project.  Specifically,  detailed API documentation,  frontend instructions,  testing procedures, and deployment strategies are missing.
