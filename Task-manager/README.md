Task Management Application (MERN + PostgreSQL)

A full-stack task management application built using the MERN stack with PostgreSQL (Sequelize ORM) for database management.

🚀 Live Demo

🔗 https://raju-task.vercel.app/

📌 Features
   👤 User Features
      - Signup & Login (JWT Authentication)
      - Create, view, update, and delete tasks
      - Task status management:
         - Todo
         - In Progress
         - Completed
   📊 Dashboard
      - Visual representation of tasks using Chart.js
      - Task statistics fetched from backend APIs

🛠 Tech Stack
   - Frontend
      - React.js
      - Redux Toolkit / Context API
      - Tailwind CSS
      - Chart.js
   
   - Backend
      - Node.js
      - Express.js
      - PostgreSQL
      - Sequelize ORM
      - JWT Authentication
        
   🔐 Authentication

      - Secure login using JWT
      - Protected routes (frontend & backend)
      - Middleware for token verification

⚙️ Installation & Setup
<pre>
Install dependencies    npm install

Run backend             npm run dev

Run frontend            npm start
</pre>

## Backend API

<pre>
- POST     /api/auth/signup
- POST     /api/auth/login
- GET      /api/tasks
- GET      /api/tasks/:taskId
- POST     /api/tasks
- PUT      /api/tasks/:taskId
- DELETE   /api/tasks/:taskId
- GET      /api/profile
</pre>

## Frontend pages

<pre>
- /                 Home Screen (Public home page for guests and private dashboard (tasks) for logged-in users)
- /signup           Signup page
- /login            Login page
- /tasks/add        Add new task
- /tasks/:taskId    Edit a task
</pre>


   ✨ Additional Features

      - Form validation (frontend & backend)
      - Error handling
      - Loading indicators
      - Responsive UI
      - Clean and modular code structure
