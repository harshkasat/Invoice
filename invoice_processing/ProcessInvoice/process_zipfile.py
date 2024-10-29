from typing import List
import zipfile
import io

from ProcessInvoice.process_file import process_single_file


def process_zip(zip_content: bytes) -> List[dict]:
    results = []
    with zipfile.ZipFile(io.BytesIO(zip_content)) as zip_file:
        for file_name in zip_file.namelist():
            print(file_name)
            if file_name.endswith(('.pdf', '.jpg', '.jpeg', '.png')):
                file_content = zip_file.read(file_name)
                result = process_single_file(file_content, file_name)
                results.append(result)
    return results