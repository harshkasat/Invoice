from pydantic import BaseModel, Field, EmailStr, condecimal, conint
from typing import List, Optional
from datetime import date

class ProductLineItem(BaseModel):
    """Represents a single product or service line in the invoice."""
    description: str = Field(..., description="Description of the product or service")
    quantity: conint(strict=True, gt=0) = Field(..., description="Quantity of the product/service provided")
    cost_per_unit: condecimal(gt=0, decimal_places=2) = Field(..., description="Cost per unit of the product/service")
    tax_rate: Optional[condecimal(ge=0, le=1, decimal_places=2)] = Field(0.00, description="Tax rate as a decimal (0.00 to 1.00)")

class Invoice(BaseModel):
    invoice_number: str = Field(..., description="Unique invoice number")
    date_of_service_rendered: date = Field(..., description="Date when the service was rendered")
    date_of_sending_invoice: date = Field(..., description="Date when the invoice was sent")
    seller_name: str = Field(..., description="Name of the seller organization or individual")
    seller_contact: EmailStr = Field(..., description="Contact email of the seller")
    buyer_name: str = Field(..., description="Name of the buyer organization or individual")
    buyer_contact: EmailStr = Field(..., description="Contact email of the buyer")
    terms_and_conditions: Optional[str] = Field(None, description="Terms and conditions related to the invoice")
    line_items: List[ProductLineItem] = Field(..., description="A list of products/services provided")  
    total_amount_owed: condecimal(gt=0, decimal_places=2) = Field(..., description="Total amount owed including tax")
    currency: str = Field(..., description="Currency code (e.g., USD, EUR)")

class InvoiveResponse(BaseModel):
    invoice : list[Invoice]
    product_list : List[ProductLineItem]



class Schema():
    def __init__(self, suffix: str):
        self.suffix = suffix

    def schema(self):
        if self.suffix == '.json':
            return self.json_schema()
    

    def json_schema(self):
        try:
            print(f"Generating JSON schema for {self.suffix}")
            schema = InvoiveResponse.model_json_schema()
            return schema
        except Exception as e:
            print(f"Error generating JSON schema: {e}")
            return None
