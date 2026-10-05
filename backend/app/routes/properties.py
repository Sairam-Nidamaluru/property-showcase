from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import SessionLocal
from ..models import Property
from ..schemas import PropertyCreate, PropertyUpdate, PropertyResponse

router = APIRouter(prefix="/properties", tags=["Properties"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/", response_model=list[PropertyResponse])
def get_properties(db: Session = Depends(get_db)):
    return db.query(Property).all()


@router.post("/", response_model=PropertyResponse)
def create_property(
    property_data: PropertyCreate,
    db: Session = Depends(get_db),
):
    new_property = Property(**property_data.model_dump())

    db.add(new_property)
    db.commit()
    db.refresh(new_property)

    return new_property


@router.put("/{property_id}", response_model=PropertyResponse)
def update_property(
    property_id: int,
    property_data: PropertyUpdate,
    db: Session = Depends(get_db),
):
    property_item = db.query(Property).filter(
        Property.id == property_id
    ).first()

    if not property_item:
        raise HTTPException(
            status_code=404,
            detail="Property not found"
        )

    for key, value in property_data.model_dump().items():
        setattr(property_item, key, value)

    db.commit()
    db.refresh(property_item)

    return property_item


@router.delete("/{property_id}")
def delete_property(
    property_id: int,
    db: Session = Depends(get_db),
):
    property_item = db.query(Property).filter(
        Property.id == property_id
    ).first()

    if not property_item:
        raise HTTPException(
            status_code=404,
            detail="Property not found"
        )

    db.delete(property_item)
    db.commit()

    return {
        "message": "Property deleted successfully"
    }