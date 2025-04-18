import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET; // Add this in your .env.local file

export default function handler(req, res) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Missing Authorization header' });
  }

  const token = authHeader.split(' ')[1]; // Expect "Bearer <token>"

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    // JWT is valid
    return res.status(200).json({ message: 'Success!', user: decoded });
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
}
