📚 BookStore

A full-stack online bookstore application with separate interfaces for users and administrators, powered by a Node.js backend API.

🚀 Project Overview

BookStore is a web-based application designed to provide an easy and convenient platform for browsing and managing books.

The project consists of three main parts:

User Interface — Customer-facing React application
Admin Panel — React-based dashboard for administrators
Backend API — Node.js/Express API for application logic and database operations
📂 Project Structure
bookStore/
│
├── admin_panel/       # Admin dashboard
│
├── backEndApi/        # Node.js + Express backend API
│
├── user_interface/    # User-facing React application
│
└── README.md
🛠️ Technologies Used
Frontend
React.js
JavaScript
HTML5
CSS3
Vite
Backend
Node.js
Express.js
MongoDB
Mongoose
Development Tools
Git
GitHub
VS Code
✨ Features
👤 User Interface
Browse books
View book details
User-friendly interface
Responsive design
API integration
🔐 Admin Panel
Admin login
Manage books
Add books
Edit books
View books
Manage users
Manage discounts
⚙️ Backend API
REST API
User management
Book management
Discount management
MongoDB database integration
⚙️ Installation
1. Clone the repository
git clone https://github.com/sushant252/bookstore.git
2. Open the project
cd bookstore
3. Install dependencies
Admin Panel
cd admin_panel
npm install
User Interface
cd ../user_interface
npm install
Backend API
cd ../backEndApi
npm install
🔐 Environment Variables

Create a .env file inside the required project folders.

Do not upload .env files to GitHub.

Example:

# Example only
PORT=5000
MONGO_URI=your_mongodb_connection_string

Use your actual environment variables according to your application configuration.

▶️ Running the Project
Start Backend
cd backEndApi
npm start
Start Admin Panel
cd admin_panel
npm run dev
Start User Interface
cd user_interface
npm run dev
📌 Important

Make sure MongoDB is running and the required environment variables are configured before starting the backend.

👨‍💻 Developer

Sushant

GitHub: @sushant252

📄 License

This project is created for learning and development purposes.
