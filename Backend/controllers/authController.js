import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register a new user
export const register = async (req, res) => {
  const { name, email, password, flatCode } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ error: 'User already exists' });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({ name, email, password: hashedPassword, flatCode });

    res.status(201).json({ 
      _id: user._id, 
      name: user.name, 
      email: user.email 
    });

  } catch (err) {
    console.error('Error in register:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Login user
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Email not found' });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Incorrect password' });

    // Ensure JWT_SECRET exists
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: 'JWT secret is missing in environment variables' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { _id: user._id, name: user.name, email: user.email, flatCode: user.flatCode },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
// Log the token to verify it is generated
console.log("🔹 Token sent to client:", token);
    
    res.json({ 
      message: 'Login successful',
      token,
      user: { _id: user._id, name: user.name, email: user.email, flatCode: user.flatCode } 
    });

  } catch (err) {
    console.error('Error in login:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
