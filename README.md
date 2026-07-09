# Personal Portfolio Website

## Project Overview

A full-stack portfolio website built with React, Node.js, Express, and MongoDB, showcasing my projects, skills, and background as a software engineering student. The site features a working contact form that sends messages to the backend, a terminal-inspired responsive UI, and dynamic project listings pulled directly from a MongoDB database.

## Main Features

- **Dynamic Project Listings** — Projects are retrieved from MongoDB and displayed dynamically on the frontend
- **Full CRUD REST API** — Complete backend API with Create, Read, Update, and Delete operations for projects and messages
- **Contact Form** — Fully functional contact form connected to the backend for message submissions
- **Terminal-Inspired UI** — Clean, responsive design with a terminal/command-line aesthetic
- **Education & Skills Sections** — Display technical skills and relevant student experience

## Technologies Used

- **Frontend:** React, Vite, CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB (with Mongoose ODM)

## Application Architecture

The application follows a client-server architecture:
- **Frontend (React)** runs on port 5173 and communicates with the backend via REST API calls
- **Backend (Express)** runs on port 5000 and handles all API requests, data validation, and database operations
- **Database (MongoDB Atlas)** stores all project and message data, accessed securely via connection URI

## Installation Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (for database access)

### Steps

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd final-project
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Install backend dependencies:**
   ```bash
   cd server
   npm install
   cd ..
   ```

## Environment Variable Instructions

The backend requires a `config.env` file inside the `/server` folder to connect to MongoDB.

### Setup

1. Create a file `/server/config.env` with the following:
   ```
   ATLAS_URI=your_mongodb_atlas_connection_string
   ```

2. Replace `your_mongodb_atlas_connection_string` with your actual MongoDB Atlas connection URI (obtain this from your MongoDB Atlas dashboard).

3. The `config.env` file is already listed in `.gitignore` and will never be committed to the repository. **Never share this file publicly** as it contains sensitive database credentials.

## Instructions for Running the Frontend

1. From the root directory, start the development server:
   ```bash
   npm run dev
   ```

2. The frontend will be available at `http://localhost:5173`

## Instructions for Running the Backend

1. Navigate to the server folder:
   ```bash
   cd server
   ```

2. Start the backend server:
   ```bash
   node server.cjs
   ```

3. The backend API will be available at `http://localhost:5000`

## API Endpoint Summary

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/projects` | Retrieve all projects |
| GET | `/api/projects/:id` | Retrieve a single project by ID |
| POST | `/api/projects` | Add a new project |
| PUT | `/api/projects/:id` | Update an existing project |
| DELETE | `/api/projects/:id` | Delete a project |
| POST | `/api/messages` | Submit a contact form message |
| GET | `/api/messages` | Retrieve all messages (admin use) |

## Screenshots

Screenshots to be added

## Live Website URL

To be added after deployment

## GitHub Repository URL

To be added

## Known Limitations

- **AWS Deployment** — Deployment to AWS is still in progress and not yet live
- **Admin Dashboard UI** — There is currently no admin interface for managing projects and messages. All CRUD operations have been tested and verified using Postman

## Future Improvements

- Build a visual admin dashboard for managing projects and messages
- Complete AWS deployment to make the site publicly accessible
- Additional responsive design polish for mobile and tablet devices

## Author Information

**Phumin So** — Software Engineering Student

---

*Last updated: July 7, 2026*
