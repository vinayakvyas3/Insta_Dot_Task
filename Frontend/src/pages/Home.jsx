import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Check if user is logged in

  const handleProtectedRoute = (path) => {
    if (token) {
      navigate(path);
    } else {
      alert('Please log in to access this feature.');
      navigate('/login');
    }
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <h1 className="logo">QuirkyRoomie</h1>
        <div className="auth-buttons">
          {!token ? (
            <>
              <Link to="/register" className="button button-primary">Register</Link>
              <Link to="/login" className="button button-secondary">Login</Link>
            </>
          ) : (
            <button onClick={() => { localStorage.removeItem('token'); navigate('/'); }} className="button button-secondary">
              Logout
            </button>
          )}
        </div>
      </nav>

      <header className="hero">
        <h2>Welcome to QuirkyRoomie</h2>
        <p>Your go-to platform for resolving flatmate conflicts with ease.</p>
        <button onClick={() => handleProtectedRoute('/file-complaint')} className="button button-highlight">
          File a Complaint
        </button>
      </header>

      <section className="features">
        <div className="feature-card">
          <h3>📜 File Complaints</h3>
          <p>Submit your issues anonymously and get them resolved efficiently.</p>
          <button onClick={() => handleProtectedRoute('/file-complaint')} className="button">Go</button>
        </div>
        <div className="feature-card">
          <h3>📢 View Complaints</h3>
          <p>Check complaints filed by others in your flat and respond accordingly.</p>
          <button onClick={() => handleProtectedRoute('/complaints')} className="button">Go</button>
        </div>
        <div className="feature-card">
          <h3>🔐 Secure Login</h3>
          <p>Register and log in securely to manage your complaints.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
