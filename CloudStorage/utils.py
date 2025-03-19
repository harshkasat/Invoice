import os
import cloudinary
import cloudinary.api
from cloudinary.uploader import upload as cloud_uploader

def cloudinary_config():
    cloudinary.config(
        cloud_name=os.getenv("CLOUD_NAME"),
        api_key=os.getenv("API_KEY"),
        api_secret=os.getenv("API_SECRET"),
        secure=True
    )

    return cloudinary


class CloudinaryStorage:
    def __init__(self):
        cloudinary_config()

    def upload_to_cloudinary(self, file_path, public_id, folder):
        try:
            print(f"Uploading file: {file_path}")
            upload_result = cloud_uploader(
                                        file=file_path,
                                        public_id=public_id,
                                        folder=folder,
                                        overwrite=True,
                                        resource_type = "raw")

            return upload_result["secure_url"], upload_result["public_id"], \
                upload_result['display_name']
        except Exception as e:
            print(f"Error uploading file: {e}")
            return None


    def get_lists_files_from_cloudinary(self, folder_name):
        try:
            result = cloudinary.api.resources(
            type="upload",
            prefix=folder_name,
            resource_type="raw"
            )
            return [resource['secure_url'] for resource in result['resources']]
        except Exception as e:
            print(f"Error getting files: {e}")
            return None

    def check_file_exist(self, public_id, folder_name):
        try:
            full_public_id = f"{folder_name}/{public_id}"
            print(f"Checking file: {full_public_id}")
            result = cloudinary.api.resource(
                public_id=full_public_id,
                resource_type="raw"
            )
            return result['secure_url']
        except cloudinary.api.NotFound:
            return None
        except Exception as e:
            print(f"Error checking file: {e}")
            return None
    
    def get_files_from_cloudinary(self, public_id):
        try:
            result = cloudinary.api.resource(
                public_id=public_id,
                resource_type="raw"
            )
            return result['secure_url'], result['display_name']
        except Exception as e:
            print(f"Error getting files: {e}")
            return None

# if __name__ == "__main__":
#     cloud_storage = CloudinaryStorage()
#     # print(cloud_storage.upload_zip_from_cloudinary("C:/Users/Zedmat/Downloads/reports.zip", "reports.zip", "reports"))
#     print(cloud_storage.get_files_from_cloudinary("reports"))
