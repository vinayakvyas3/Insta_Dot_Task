import React, { useState, useEffect, useContext } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/App.css';

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const { token } = useAuth();

 useEffect(() => {
  if (!token) {
    console.log("No token available, skipping fetch.");
    return;
  }

  const fetchComplaints = async () => {
    try {
      console.log("Fetching complaints with token:", token);
      const { data } = await API.get('/complaints'); // Token auto-included
      setComplaints(data);
    } catch (err) {
      console.error('Failed to fetch complaints:', err.response?.data?.error || err.message);
      alert('Error: ' + (err.response?.data?.error || err.message));
    }
  };

  fetchComplaints();
}, [token]);


  return (
    <div>
      <h2>Active Complaints</h2>
      {complaints.map((complaint) => (
        <div key={complaint._id} className="complaint-card">
          <h3>{complaint.title}</h3>
          <p>{complaint.description}</p>
          <p>Type: {complaint.type} | Severity: {complaint.severity}</p>
        </div>
      ))}
    </div>
  );
};

export default Complaints;
