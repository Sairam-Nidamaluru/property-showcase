from sqlalchemy import Column, Integer, String, Text, Numeric, ForeignKey
from sqlalchemy.orm import relationship

from .database import Base


class Property(Base):
    __tablename__ = "properties"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    location = Column(String(255), nullable=False)
    price = Column(Numeric(15, 2), nullable=False)
    size_sqft = Column(Integer, nullable=False)
    bedrooms = Column(Integer, nullable=False)
    description = Column(Text, nullable=False)
    image_url = Column(String(500), nullable=False)

    inquiries = relationship(
        "Inquiry",
        back_populates="property",
        cascade="all, delete",
    )


class Inquiry(Base):
    __tablename__ = "inquiries"

    id = Column(Integer, primary_key=True, index=True)
    property_id = Column(
        Integer,
        ForeignKey("properties.id"),
        nullable=False,
    )
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=False)
    message = Column(Text, nullable=False)

    property = relationship(
        "Property",
        back_populates="inquiries",
    )