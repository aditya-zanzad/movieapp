# Movie App Backend

A robust REST API for a Movie Application built with Node.js, Express, and MongoDB.

## Features

- **Movies API**: 
  - Get all movies
  - Search movies by name or description
  - Sort movies by various fields (rating, release date, etc.)
- **Authentication**: JWT-based authentication and role-based authorization (Admin/User).
- **Admin Features**: Create, Update, Delete movies (Admin only).
- **Performance**: 
  - Distributed Queue system for Lazy Insertion of movies.
  - Indexed MongoDB fields for fast search.
- **Security**: Password hashing and protected routes.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JSON Web Tokens (JWT) & Bcrypt

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd movie_app/backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory with the following:
   ```env
   PORT=3000
   MONGO_URL=mongodb+srv://<your-mongo-uri>
   JWT_SECRET=your_super_secret_key
   ```

4. **Run Locally**
   ```bash
   # Development mode (with nodemon)
   npm run dev
   
   # Production mode
   npm start
   ```

## API Documentation

### Movies
- **GET** `/api/movies` - Retrieve all movies
- **GET** `/api/movies/search?query=name` - Search movies
- **GET** `/api/movies/sorted?sortBy=rating&order=desc` - Sort movies

### Admin (Protected)
- **POST** `/api/admin/movies` - Add a new movie (Returns Job ID for queued insertion)
- **PUT** `/api/admin/movies/:id` - Update a movie
- **DELETE** `/api/admin/movies/:id` - Delete a movie

### Authentication
- **POST** `/api/user/register` - Register a new user
- **POST** `/api/user/login` - Login

## Deployment

This backend is ready to be deployed on platforms like Render, Railway, or Heroku.
Ensure you set the `start` script to `node server.js` (already configured).
