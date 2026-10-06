# White Lotus Properties

A full-stack property showcase application built with React.js, Tailwind CSS, Python, FastAPI, PostgreSQL, and REST APIs. The application allows users to browse properties and submit inquiries, while administrators can create, update, and delete property listings.

## Live Demo

https://property-showcase-zeta.vercel.app/

## GitHub Repository

https://github.com/Sairam-Nidamaluru/property-showcase

## Features

* Responsive property listing page
* Property details page
* Property search/filtering
* Property inquiry form
* Admin dashboard
* Create, update, and delete properties
* PostgreSQL database integration
* REST APIs using FastAPI
* Loading and error states
* Production deployment with Vercel and Render

## Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* JavaScript
* REST API integration

### Backend

* Python
* FastAPI
* SQLAlchemy
* Pydantic
* PostgreSQL

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: Render PostgreSQL

## Project Structure

```text
property-showcase/
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   └── main.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── public/
│   │   └── images/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   ├── package.json
│   └── .env
│
├── README.md
├── AI_USAGE.md
└── .gitignore
```

## Local Setup

### Prerequisites

Make sure the following are installed:

* Python 3.11+
* Node.js 18+
* PostgreSQL
* Git

## Backend Setup

Open a terminal in the project root.

```bash
cd backend
```

Create and activate a virtual environment.

### Windows

```powershell
python -m venv venv
venv\Scripts\activate
```

Install dependencies:

```powershell
pip install -r requirements.txt
```

Create a `.env` file inside `backend`:

```env
DATABASE_URL=postgresql+psycopg://USERNAME:PASSWORD@localhost:5432/property_showcase
```

Create the PostgreSQL database:

```text
property_showcase
```

Start the backend:

```powershell
uvicorn app.main:app --reload
```

Backend will run at:

```text
http://127.0.0.1:8000
```

Swagger API documentation:

```text
http://127.0.0.1:8000/docs
```

## Frontend Setup

Open another terminal:

```powershell
cd frontend
```

Install dependencies:

```powershell
npm install
```

Create a `.env` file inside `frontend`:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Start the frontend:

```powershell
npm run dev
```

The application will normally run at:

```text
http://localhost:5173
```

## API Endpoints

### Properties

```text
GET    /properties/
POST   /properties/
PUT    /properties/{property_id}
DELETE /properties/{property_id}
```

### Inquiries

```text
GET    /inquiries/
POST   /inquiries/
```

## Architecture and Design Decisions

The application uses React.js for the frontend and FastAPI for the backend to keep the UI and API layers clearly separated. React communicates with the backend through REST APIs rather than directly accessing the database. FastAPI provides request validation through Pydantic schemas and database access through SQLAlchemy. PostgreSQL was selected as the relational database because property and inquiry data have clear relationships and require persistent storage. The frontend API URL is configured through an environment variable so the same code can work locally and in production. The backend uses CORS configuration to allow the deployed Vercel frontend to communicate with the Render API. Given the time limit, authentication and advanced property management features were kept outside the scope of the assignment. The implementation focuses on the core property browsing, inquiry, CRUD, and deployment requirements.

## Trade-offs

Given the limited development time, the application uses a straightforward REST architecture instead of introducing additional layers or complex state-management patterns. Property images are served as static frontend assets instead of implementing an external image-storage service. Authentication and role-based access control were not implemented because the assignment focused primarily on the property showcase functionality. Database migrations were also kept simple by using SQLAlchemy table creation for the assignment environment.

## What I Would Do Next

With additional time, I would add authentication and authorization for the admin dashboard, introduce database migrations using Alembic, add automated frontend and backend tests, improve image management with cloud storage, add pagination for larger property datasets, improve search and filtering, add monitoring and structured logging, and introduce CI/CD checks for automated testing and deployment validation.

## Deployment

Frontend:

https://property-showcase-zeta.vercel.app/

Backend:

https://property-showcase-api.onrender.com/

API Documentation:

https://property-showcase-api.onrender.com/docs
