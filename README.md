# To-Do List CRUD App (Java + Spring Boot + React)

A full-stack To-Do List application using Java Spring Boot (Backend) and React + Vite (Frontend), with data stored in PostgreSQL (Firebase Data Connect).

## Prerequisites

- **Java 17+** (JDK installed)
- **Node.js** (v18+ recommended)
- **Maven** (optional if you use the wrapper `mvnw` or have it installed)
- **PostgreSQL Database** running locally or via Cloud SQL.

## Project Structure

- `backend/` - Spring Boot application
- `frontend/` - React application

## Setup & Running

### 1. Database Configuration

Ensure you have a PostgreSQL database running. By default, the app expects:
- **URL**: `jdbc:postgresql://localhost:5432/todo_db`
- **User**: `postgres`
- **Password**: `password`

You can change these settings in:
`backend/src/main/resources/application.properties`

> **Note**: Create the database `todo_db` before running the backend.

### 2. Backend (Spring Boot)

Navigate to the `backend` directory and run:

Using installed Maven:
```bash
cd backend
mvn spring-boot:run
```

The backend server will start at `http://localhost:8080`.

### 3. Frontend (React)

Open a new terminal, navigate to the `frontend` directory, install dependencies (already done), and start the dev server:

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`.

## Features

- **Create**: Add new tasks.
- **Read**: View list of tasks.
- **Update**: Mark tasks as completed/incomplete.
- **Delete**: Remove tasks from the list.

## Troubleshooting

- **CORS Errors**: Ensure the backend allows requests from `http://localhost:5173`. check `TodoController.java`.
- **Database Connection**: Verify your Postgres instance is running and credentials match `application.properties`.
