import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import FileComplaint from './pages/FileComplaint';
import Complaints from './pages/Complaints';
import API from './services/api'; // Import API instance
import './styles/App.css';

// Protected Route Component
const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('token');
  return token ? element : <Navigate to="/login" />;
};

const App = () => {
  const [backendConnected, setBackendConnected] = useState(false);

  useEffect(() => {
    // Check Backend Connection
    const checkBackend = async () => {
      try {
        const response = await API.get('/test'); // Ensure your backend has this route
        console.log('✅ Backend Connected:', response.data);
        setBackendConnected(true);
      } catch (error) {
        console.error('❌ Backend Connection Failed:', error.message);
        setBackendConnected(false);
      }
    };

    checkBackend();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div>
          {!backendConnected && <p style={{ color: 'red', textAlign: 'center' }}>⚠️ Backend is not connected!</p>}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/file-complaint" element={<PrivateRoute element={<FileComplaint />} />} />
            <Route path="/complaints" element={<PrivateRoute element={<Complaints />} />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
