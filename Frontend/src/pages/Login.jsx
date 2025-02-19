// import React, { useState } from 'react';
// import API from '../services/api';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await API.post('/auth/login', { email, password });
  
//       // Store the token
//       localStorage.setItem('token', data.token);
  
//       // Example: Redirect based on user role (assuming API returns a user role)
//       if (data.user.role === 'admin') {
//         navigate('/complaints'); // Admins go to View Complaints
//       } else {
//         navigate('/file-complaint'); // Users go to File Complaint
//       }
//     } catch (err) {
//       console.error('Login failed:', err.response?.data?.error || err.message);
//     }
//   };
  

//   return (
//     <form onSubmit={handleLogin}>
//       <h2>Login</h2>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  setError('');

  try {
    const { data } = await API.post('/api/auth/login', { email, password });

    console.log('✅ Login successful. Token received:', data.token);
    
    // Ensure token is stored before navigating
    localStorage.setItem('token', data.token);
    
    // Force reloading to make sure token is available for subsequent requests
    window.location.href = '/file-complaint';

  } catch (err) {
    console.error('❌ Login failed:', err.response?.data?.error || err.message);
    setError(err.response?.data?.error || 'Login failed. Please try again.');
  }
};


  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
