from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import SessionLocal
from ..models import Inquiry
from ..schemas import InquiryCreate, InquiryResponse

router = APIRouter(prefix="/inquiries", tags=["Inquiries"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=InquiryResponse)
def create_inquiry(
    inquiry_data: InquiryCreate,
    db: Session = Depends(get_db),
):
    new_inquiry = Inquiry(**inquiry_data.model_dump())

    db.add(new_inquiry)
    db.commit()
    db.refresh(new_inquiry)

    return new_inquiry


@router.get("/", response_model=list[InquiryResponse])
def get_inquiries(db: Session = Depends(get_db)):
    return db.query(Inquiry).all()