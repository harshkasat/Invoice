import os
import cloudinary
import cloudinary.api
from cloudinary.uploader import upload as cloud_uploader
from . import cloudinary_config



class CloudinaryStorage:
    def __init__(self) -> None:
        cloudinary_config()

    def check_file_exist(self, display_name, folder_name):
        try:
            full_pulbic_id = f"{folder_name}/{display_name}"
            try:
                result = cloudinary.api.resource(
                    public_id=full_pulbic_id,
                    resource_type="raw"
                )
                return result
            except cloudinary.api.NotFound:
                return False
        except Exception as e:
            print(f"Error checking file: {e}")

    def get_files_from_cloudinary(self, public_id):
        try:
            result = cloudinary.api.resource(
                public_id=public_id,
                resource_type="raw"
            )
            return result['secure_url'], result['display_name']
        except Exception as e:
            print(f"Error getting file: {e}")
            return None, None

    def upload_to_cloudinary(self, file_path, folder_name, display_name):
        try:
            exist_file = self.check_file_exist(display_name, folder_name)
            if exist_file:
                print(f"File already exists: {display_name}")
                return {
                    "message":"File already exists",
                    "result":exist_file
                }
            print(f"Uploading file: {file_path}")
            upload_result = cloud_uploader(
                                        file=file_path,
                                        public_id=display_name,
                                        folder=folder_name,
                                        overwrite=False,
                                        resource_type = "raw",)

            return upload_result["secure_url"], upload_result["public_id"], \
                upload_result['display_name']
        except Exception as e:
            print(f"Error uploading file: {e}")
            return None

    def delete_file_from_cloudinary(self, display_name, folder_name):
        try:
            _, public_id = self.check_file_exist(display_name, folder_name)
            if not public_id:
                return "File does not exist"
            result = cloudinary.uploader.destroy(
                public_id=public_id,
                resource_type="raw"
            )
            print(f"Deleted file: {result['result']}")
            return result
        except Exception as e:
            print(f"Error deleting file: {e}")
            return None

# if __name__ == "__main__":
    # cloud_storage = CloudinaryStorage(public_id="Sugarlab Proposal.pdf", folder_name="reports")
    # print(cloud_storage.check_file_exist())
    # print(cloud_storage.upload_to_cloudinary(
    #         file_path="C:/Users/Zedmat/Downloads/Sugarlab Proposal.pdf"))
    # print(cloud_storage.delete_file_from_cloudinary())
