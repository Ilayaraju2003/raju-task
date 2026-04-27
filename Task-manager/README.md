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

📡 API Endpoints

POST   /api/auth/signup
POST   /api/auth/login

GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id

⚙️ Installation & Setup
# Install dependencies
npm install

# Setup environment variables
# Create .env file and add:
DATABASE_URL=
JWT_SECRET=

# Run backend
npm run dev

# Run frontend
npm start

✨ Additional Features
      - Form validation (frontend & backend)
      - Error handling
      - Loading indicators
      - Responsive UI
      - Clean and modular code structure
