import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  const authHeader = req.header('Authorization');
  console.log("Authorization Header:", authHeader);

  const token = authHeader?.replace('Bearer ', '');
  if (!token) {
    console.log("No token provided!");
    return res.status(401).json({ error: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("Invalid token error:", err.message);
    res.status(400).json({ error: 'Invalid token' });
  }
};
