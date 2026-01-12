

# Task Management App – Backend

This is the backend service for the Task Management Application.  
It provides REST APIs for user authentication and task CRUD operations.

---

## 🚀 Features
- User authentication using JWT
- Create, Read, Update, Delete (CRUD) tasks
- User-specific task access
- Protected routes using middleware
- MongoDB database integration

---

## 🛠 Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

## 📂 API Endpoints
| Method | Endpoint | Description |
|------|---------|------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/tasks | Get all tasks |
| POST | /api/tasks | Add new task |
| PUT | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |

---

## ▶️ How to Run Locally

```bash
git clone https://github.com/Souvik-1705/Task-Management-App-Backend.git
cd Task-Management-App-Backend
npm install
npm start
