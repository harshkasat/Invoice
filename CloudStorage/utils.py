import os
import cloudinary
import cloudinary.api
from cloudinary.uploader import upload as cloud_uploader
from . import cloudinary_config



class CloudinaryStorage:
    def __init__(self) -> None:
        cloudinary_config()

    def upload_to_cloudinary(self, file_path, folder_name, display_name):
        try:
            print(f"Uploading file: {file_path}")
            upload_result = cloud_uploader(
                                        file=file_path,
                                        display_name=display_name,
                                        folder=folder_name,
                                        overwrite=False,
                                        resource_type = "raw",)

            return upload_result["secure_url"], upload_result["public_id"], \
                upload_result['display_name']
        except Exception as e:
            print(f"Error uploading file: {e}")
            return None

    # def get_lists_files_from_cloudinary(self):
    #     try:
    #         result = cloudinary.api.resources(
    #         type="upload",
    #         prefix=self.folder_name,
    #         resource_type="raw"
    #         )
    #         return [resource['secure_url'] for resource in result['resources']]
    #     except Exception as e:
    #         print(f"Error getting files: {e}")
    #         return None

    # def get_files_from_cloudinary(self):
    #     try:
    #         existing_path = self.check_file_exist()
    #         if not existing_path:
    #             return "File does not exist"
    #         result = cloudinary.api.resource(
    #             public_id=existing_path,
    #             resource_type="raw"
    #         )
    #         return result['secure_url'], result['display_name']
    #     except Exception as e:
    #         print(f"Error getting files: {e}")
    #         return None

#     def delete_file_from_cloudinary(self):
#         try:
#             public_id = self.check_file_exist()
#             if not public_id:
#                 return "File does not exist"
#             result = cloudinary.uploader.destroy(
#                 public_id=public_id,
#                 resource_type="raw"
#             )
#             print(f"Deleted file: {result['result']}")
#             return result
#         except Exception as e:
#             print(f"Error deleting file: {e}")
#             return None

#     def update_file_from_cloudinary(self, update_display_name:str):
#         try:
#             existing_path = self.check_file_exist()
#             if not existing_path:
#                 return "File does not exist"
#             result = cloudinary.api.update(
#                 public_id=existing_path,
#                 resource_type="raw",
#                 display_name=update_display_name
#             )
#             return result
#         except Exception as e:
#             print(f"Error updating file: {e}")

# if __name__ == "__main__":
#     cloud_storage = CloudinaryStorage(public_id="Sugarlab Proposal.pdf", folder_name="reports")
# #     # print(cloud_storage.check_file_exist())
#     print(cloud_storage.upload_to_cloudinary(
#             file_path="C:/Users/Zedmat/Downloads/Sugarlab Proposal.pdf"))


    # print(cloud_storage.delete_file_from_cloudinary())
    # print(cloud_storage.get_files_from_cloudinary())
    # print(cloud_storage.update_file_from_cloudinary("Sugarlab Proposals"))
    # print(cloud_storage.upload_to_cloudinary("C:/Users/Zedmat/Downloads/Sugarlab Proposal.pdf", "Sugarlab Proposal.pdf", "reports"))
    # print(cloud_storage.get_lists_files_from_cloudinary("reports"))
    # print(cloud_storage.check_file_exist("Sugarlab Proposal.pdf", "reports"))