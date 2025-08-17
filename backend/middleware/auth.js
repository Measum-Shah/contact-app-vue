// middleware/auth.js
import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, 'YOUR_SECRET_KEY'); // same secret as login
    req.user = decoded; // attach user info to request
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
