import { MOCK_TOKEN } from '../config/constants.js';

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Access denied. Invalid token format.' });
  }

  const token = parts[1];
  if (token !== MOCK_TOKEN) {
    return res.status(401).json({ error: 'Access denied. Invalid token.' });
  }

  next();
};
