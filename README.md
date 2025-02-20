# 🏠 QuirkyRoomie

QuirkyRoomie is a web application designed to help flatmates resolve conflicts by filing and managing complaints easily.

## 📌 Features
- 📝 **File Complaints**: Users can file complaints about their flatmates.
- 📋 **View Active Complaints**: See and track submitted complaints.
- 🔐 **Secure Authentication**: Login and register securely.
- 📡 **MongoDB Atlas Integration**: Data is stored in the cloud.
- 📱 **Responsive UI**: Works seamlessly on desktop and mobile.

---

## 🚀 Tech Stack
### **Frontend**
- React.js ⚛️
- React Router 🛤
- Context API for Authentication 🔐
- CSS for styling 🎨

### **Backend**
- Node.js 🟢
- Express.js 🚀
- MongoDB Atlas 🌍 (with Mongoose ORM)
- JWT Authentication 🔑

---

## 📂 Project Structure

---

## 🛠 Installation & Setup

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/vinayakvyas3/QuirkyRoomie.git
cd QuirkyRoomie

2️⃣ Setup Backend
sh
Copy
Edit
cd Backend
npm install  # Install dependencies
Create a .env file in the Backend/ directory with:
ini
Copy
Edit
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
Run the server:
sh
Copy
Edit
node server.js

3️⃣ Setup Frontend
sh
Copy
Edit
cd ../Frontend
npm install  # Install dependencies
Start the React app:
sh
Copy
Edit
npm run dev
🚀 Running the Project
1️⃣ Start Backend: cd Backend && node server.js
2️⃣ Start Frontend: cd Frontend && npm run dev

📌 Open in Browser: http://localhost:5173/ (or port shown in terminal)


