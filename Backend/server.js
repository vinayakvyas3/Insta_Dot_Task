import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import complaintRoutes from './routes/complaintRoutes.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Default Route (Fix for Cannot GET /)
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
