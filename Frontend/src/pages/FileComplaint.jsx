import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/App.css';

const FileComplaint = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Noise');
  const [severity, setSeverity] = useState('Mild');
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('🔹 Token in FileComplaint:', token);
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert('Please login first!');
      navigate('/login');
      return;
    }

    try {
      await API.post('/complaints', 
        { title, description, type, severity }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('Complaint filed!');
      navigate('/complaints'); // Redirect after submission
    } catch (err) {
      alert('Failed to file complaint: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="complaint-card">
      <h2>File a Complaint</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Noise">Noise</option>
          <option value="Cleanliness">Cleanliness</option>
          <option value="Bills">Bills</option>
          <option value="Pets">Pets</option>
        </select>
        <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
          <option value="Mild">Mild</option>
          <option value="Annoying">Annoying</option>
          <option value="Major">Major</option>
          <option value="Nuclear">Nuclear</option>
        </select>
        <button type="submit" className="button button-primary">Submit</button>
      </form>

      {/* View Active Complaints Button */}
      <button onClick={() => navigate('/complaints')} className="button button-secondary" style={{ marginTop: '10px' }}>
        View Active Complaints
      </button>
    </div>
  );
};

export default FileComplaint;

