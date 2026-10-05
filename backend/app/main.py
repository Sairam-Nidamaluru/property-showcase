from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from . import models
from .routes.properties import router as properties_router
from .routes.inquiries import router as inquiries_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="White Lotus Property API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(properties_router)
app.include_router(inquiries_router)


@app.get("/")
def root():
    return {
        "message": "White Lotus Property API is running"
    }


@app.get("/health")
def health():
    return {
        "status": "ok"
    }