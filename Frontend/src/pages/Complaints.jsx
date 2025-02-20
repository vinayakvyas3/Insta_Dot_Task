import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/App.css';

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;

    const fetchComplaints = async () => {
      try {
        const { data } = await API.get('/complaints');
        setComplaints(data);
      } catch (err) {
        alert('Failed to fetch complaints: ' + (err.response?.data?.error || err.message));
      }
    };
    fetchComplaints();
  }, [token]);

  // Function to handle voting
  const handleVote = async (id, voteType) => {
    try {
      const { data } = await API.post(
        `/complaints/${id}/vote`,
        { voteType },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update complaints list with new vote count
      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === id ? { ...complaint, votes: data.complaint.votes } : complaint
        )
      );
    } catch (err) {
      alert('Failed to vote: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div>
      <h2>Active Complaints</h2>
      {complaints.map((complaint) => (
        <div key={complaint._id} className="complaint-card">
          <h3>{complaint.title}</h3>
          <p>{complaint.description}</p>
          <p>Type: {complaint.type} | Severity: {complaint.severity}</p>
          <p>Votes: {complaint.votes}</p>
          <button onClick={() => handleVote(complaint._id, 'upvote')}>👍 Upvote</button>
          <button onClick={() => handleVote(complaint._id, 'downvote')}>👎 Downvote</button>
        </div>
      ))}
    </div>
  );
};

export default Complaints;
