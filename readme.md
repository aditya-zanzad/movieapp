# 🎬 CineManage: Advanced Movie Management System

A high-performance MERN stack application featuring role-based access control, distributed queue processing, and a modern Material-UI interface. Designed for seamless movie discovery and efficient administrative management.

---

## 🚀 Key Features

### 💻 Frontend (Client)
- **Dynamic Discovery**: Responsive grid layout for browsing movies with real-time sorting and filtering.
- **Search Engine**: Instant movie search by title or description.
- **Role-Based UI**: Dedicated administrative dashboards and conditional rendering based on user permissions.
- **State Management**: Robust use of React Context API for authentication and movie data flow.
- **Secure Auth**: JWT-integrated login and registration system with persistent session handling.

### ⚙️ Backend (Server)
- **Lazy Insertion**: Implements a **Distributed Queue System** for movie creation to ensure high availability and responsiveness under heavy load.
- **Robust Security**: Password hashing via Bcrypt and specialized middleware for JWT verification and role authorization.
- **Optimized DB**: Indexed MongoDB collections for high-speed search and retrieval operations.
- **Standardized API**: RESTful architecture with clean, versioned endpoints.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, Material UI (MUI), Axios, React Router 6 |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Auth** | JSON Web Tokens (JWT), Bcrypt.js |
| **Process Management** | Nodemon (Development), Custom Queue Worker |

---

## 📋 Project Architecture

```text
movie_app/
├── backend/            # Express Server & API logic
│   ├── controller/     # Business logic
│   ├── models/         # Database schemas
│   ├── services/       # Queue worker & utilities
│   └── server.js       # Entry point
├── frontend/           # Vite + React Client
│   ├── src/
│   │   ├── context/    # Auth & Movie state management
│   │   ├── components/ # Reusable UI components
│   │   └── pages/      # Route-level views (Home, Admin, Login)
│   └── .env            # Frontend environment config
└── .gitignore          # Root-level ignore rules
```

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v20+)
- MongoDB Atlas account or local MongoDB instance

### 1. Clone the Repository
```bash
git clone https://github.com/aditya-zanzad/movieapp.git
cd movieapp
```

### 2. Backend Configuration
```bash
cd backend
npm install
```
Create a `.env` file in `/backend`:
```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 3. Frontend Configuration
```bash
cd ../frontend
npm install
```
Create a `.env` file in `/frontend`:
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### 4. Running the Application
**Backend:**
```bash
cd backend
npm run dev
```
**Frontend:**
```bash
cd frontend
npm run dev
```

---

## 🔌 API Endpoints (Quick Reference)

### Public / User
- `GET /api/movies` - List all movies
- `GET /api/movies/search?query=...` - Search movies
- `POST /api/user/login` - Authenticate user

### Administrator (Protected)
- `POST /api/admin/movies` - Queue a movie for insertion (Background process)
- `PUT /api/admin/movies/:id` - Update movie details
- `DELETE /api/admin/movies/:id` - Remote movie from storage

---

## 📈 Future Roadmap
- [ ] Add Image Upload support via Cloudinary/S3.
- [ ] Implement user "Favorites" and "Watchlist" features.
- [ ] Integration of third-party Movie APIs (TMDB) for data enrichment.
- [ ] Unit & Integration testing (Jest/Cypress).

---

## 👤 Author
**Aditya Zanzad**
- [GitHub](https://github.com/aditya-zanzad)
- [LinkedIn Profile](your-linkedin-link)
