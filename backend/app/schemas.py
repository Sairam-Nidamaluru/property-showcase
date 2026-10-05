from pydantic import BaseModel, EmailStr, Field


class PropertyBase(BaseModel):
    name: str = Field(min_length=2)
    location: str = Field(min_length=2)
    price: float = Field(gt=0)
    size_sqft: int = Field(gt=0)
    bedrooms: int = Field(gt=0)
    description: str = Field(min_length=10)
    image_url: str = Field(min_length=1)


class PropertyCreate(PropertyBase):
    pass


class PropertyUpdate(PropertyBase):
    pass


class PropertyResponse(PropertyBase):
    id: int

    class Config:
        from_attributes = True


class InquiryCreate(BaseModel):
    property_id: int
    name: str = Field(min_length=2)
    email: EmailStr
    phone: str = Field(min_length=7)
    message: str = Field(min_length=5)


class InquiryResponse(InquiryCreate):
    id: int

    class Config:
        from_attributes = True