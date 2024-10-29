import pandas as pd
import json
from io import BytesIO

def _convert_xlsx(json_file: json):
    try:
        # Lists to store data frames from each invoice and product list
        invoice_dfs = []
        line_items_dfs = []
        line_items_df = {}
        product_list_dfs = []
        product_list_df = {}

        # Process each invoice and its associated line items
        for invoice in json_file['results']:
            invoice_data = invoice['invoice'][0]
            invoice_number = invoice_data['invoice_number']
            
            # Convert invoice data to DataFrame and append to the list
            invoice_dfs.append(pd.DataFrame([{
                "Invoice Number": invoice_data['invoice_number'],
                "Date of Service Rendered": invoice_data['date_of_service_rendered'],
                "Date of Sending Invoice": invoice_data['date_of_sending_invoice'],
                "Seller Name": invoice_data['seller_name'],
                "Buyer Name": invoice_data['buyer_name'],
                "Total Amount Owed": invoice_data['total_amount_owed'],
                "Currency": invoice_data['currency']
            }]))

            # Convert line items to DataFrame, add invoice_number, and append to the list
            line_items_df['Invoice Number'] = invoice_number
            line_items_df = pd.DataFrame(invoice_data['line_items'])
            line_items_dfs.append(line_items_df)
        
            # Convert product list to DataFrame, add invoice_number, and append to the list
            product_list_df['Invoice Number'] = invoice_number
            product_list_df = pd.DataFrame(invoice['product_list'])
            product_list_dfs.append(product_list_df)

        # Concatenate all data frames for each section
        invoice_df = pd.concat(invoice_dfs, ignore_index=True)
        line_items_df = pd.concat(line_items_dfs, ignore_index=True)
        product_list_df = pd.concat(product_list_dfs, ignore_index=True)

        # Create an in-memory BytesIO buffer
        output = BytesIO()

        # Write concatenated data frames to the buffer as an Excel file
        with pd.ExcelWriter(output) as writer:
            invoice_df.to_excel(writer, sheet_name='Invoice', index=False)
            line_items_df.to_excel(writer, sheet_name='Line Items', index=False)
            product_list_df.to_excel(writer, sheet_name='Product List', index=False)

        # Seek to the beginning of the stream
        output.seek(0)
        print("Excel file created in-memory successfully.")
        
        return output  # Return the BytesIO object

    except Exception as e:
        print(f"Error converting JSON to Excel: {e}")
        return None
