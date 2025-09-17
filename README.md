# TidyTask

TidyTask is a modern task management application built with the MERN stack (MongoDB, Express.js, React, and Node.js). It allows users to organize their tasks by categories, track completion status, and manage their daily activities efficiently.

## Features

- 🔐 User Authentication (Register/Login)
- 📝 Create, Read, Update, and Delete Tasks
- 🏷️ Categorize Tasks (Personal, Work, Shopping, Health, etc.)
- ✅ Mark Tasks as Complete/Incomplete
- 🔍 Filter Tasks by Category
- 💫 Modern and Responsive UI with Chakra UI

## Tech Stack

### Backend
- Node.js & Express.js - Server framework
- MongoDB & Mongoose - Database
- JWT - Authentication
- bcryptjs - Password hashing
- cors - Cross-origin resource sharing

### Frontend
- React with Vite - UI library and build tool
- React Router - Navigation
- Chakra UI - Component library
- Axios - HTTP client
- React Context - State management

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas URI)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/rudhar07/TidyTask.git
cd TidyTask
```

2. Install Backend Dependencies
```bash
cd backend
npm install
```

3. Set up Environment Variables
Create a `.env` file in the backend directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tidytask
JWT_SECRET=your-secret-key
```

4. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### Running the Application

1. Start the Backend Server
```bash
cd backend
npm run dev
```
The server will run on http://localhost:5000

2. Start the Frontend Development Server
```bash
cd frontend
npm run dev
```
The application will open in your browser at http://localhost:5173

## API Endpoints

### Authentication
- POST `/auth/register` - Register a new user
- POST `/auth/login` - Login user

### Tasks
- GET `/tasks` - Get all tasks
- GET `/tasks?category=work` - Get tasks by category
- POST `/tasks` - Create a new task
- PATCH `/tasks/:id` - Update a task
- DELETE `/tasks/:id` - Delete a task

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.