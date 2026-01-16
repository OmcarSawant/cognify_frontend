🤖 Cognify – AI Chatbot Platform

Cognify is a full-stack AI chatbot platform that allows users to create projects (agents), attach prompts to them, and interact with AI models through a clean, modern chat interface. It supports authentication, project management, and real-time AI responses using LLM APIs.
Responsive Modern design.

✨ Features
🔐 Authentication

User registration and login

Secure authentication using JWT

Protected routes for authenticated users

👤 User Management

Create and manage user accounts

Each user owns their own projects (agents)

🧠 Projects / Agents

Create multiple projects (agents) under a user

Each project represents a separate AI agent

Store and manage prompts per project

💬 Chat Interface

Interactive chat UI

Communicates with LLM APIs (OpenAI / OpenRouter / others)

Project-specific conversations

📁 (Optional / Future)

File upload support for projects

Context-aware chats using uploaded files

🏗️ Tech Stack
Frontend

React

Vite

Tailwind CSS

Axios

Responsive UI design

Backend

Node.js

Express.js

JWT Authentication

MongoDB (Mongoose)

AI Integration

OpenAI Responses API
or

OpenRouter Completion API
or

Any compatible LLM provider

📂 Project Structure
cognify/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── main.jsx
│   └── vite.config.js
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
└── README.md

🚀 Getting Started
1️⃣ Clone the Repository
git clone https://github.com/OmcarSawant/cognify_frontend.git
cd cognify

2️⃣ Backend Setup
cd backend
npm install


Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_api_key


Start the backend:

npm run dev

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

🔑 Environment Variables
Variable	Description
MONGO_URI	MongoDB connection string
JWT_SECRET	Secret key for JWT
OPENAI_API_KEY	API key for LLM
PORT	Backend server port
🌐 Deployment
Frontend

Deployed on Vercel

Auto-deploys from GitHub commits

Backend

Deployed on Render

Uses environment variables for secrets

🧪 API Overview
Auth

POST /auth/register

POST /auth/login

Projects

POST /projects

GET /projects

GET /projects/:id

Prompts

POST /prompts

GET /prompts/:projectId

Chat

POST /chat

🛠️ Known Improvements / TODOs

 File upload support

 Streaming responses

 Role-based prompts (system/user/assistant)

 Conversation history per project

 Architecture and Flow 
<img width="1440" height="900" alt="Desktop - 1" src="https://github.com/user-attachments/assets/060a06cb-495e-44d9-8cb2-40eb0a6b1282" />
![Desktop - 2](https://github.com/user-attachments/assets/0861c09b-97bc-418c-aebe-8a722b8edbd2)


 

👨‍💻 Author

Built with ❤️ by Omkar Sawant
