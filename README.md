# 📚 PlotPulse – Feel the Heartbeat of Every Story

**PlotPulse** is a full-stack book review web application that allows users to explore, review, and manage books seamlessly.  
It combines elegant design with smooth animations and a secure authentication system, delivering a premium reading community experience.

---

## 🌟 Features

- 🔐 **User Authentication** – Sign up, login, and logout functionality with secure session handling.  
- 🏠 **Animated Welcome Page** – A dynamic and fully animated entry page with background visuals and motion effects.  
- 📖 **Book Management** – Logged-in users can **add**, **edit**, and **delete** the books they’ve added.  
- 💬 **Book Reviews** – Read and share reviews about your favorite books.  
- 🎨 **Modern UI** – Professional, blue-themed Bookish Serif design with a responsive layout.  
- 👤 **Profile Section in Navbar** – Displays user info and provides quick access to profile and logout.  
- ⚙️ **Protected Routes** – Only authenticated users can access book pages.

---

## 🛠️ Tech Stack

### Frontend:
- React.js  
- React Router  
- Framer Motion (for animations)  
- CSS (custom, responsive styling)

### Backend:
- Node.js  
- Express.js  
- MongoDB (via Mongoose)

### Authentication:
- JSON Web Tokens (JWT)
- bcryptjs for password hashing

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Harsha2614/book-review.git
cd book-review

2️⃣ Install Dependencies

Backend

cd backend
npm install

3️⃣ Set Up Environment Variables

Create a .env file in the backend folder with:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

4️⃣ Start the Application

## Run backend:

npm run dev

## Run frontend:

cd frontend

npm install

npm start

🧩 Folder Structure
plotpulse/
│
├── backend/
│   ├── server.js
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── middleware/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── styles/
│   │       └── main.css
│   └── package.json
│
└── README.md

💡 Future Enhancements

📸 Profile picture support

🌐 Public book recommendations

📊 Analytics dashboard for readers’ trends

🧠 AI-powered review sentiment analysis

👨‍💻 Author

Harsha Vardhan Narayana
Frontend & Backend Developer

