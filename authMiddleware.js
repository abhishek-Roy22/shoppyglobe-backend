import { verifyToken } from './generateToken.js';

const authMiddleware = (req, res, next) => {
  // check for token in headers
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied, please login.' });
  }

  try {
    // verify token
    const payload = verifyToken(token);
    req.user = payload; // attach user data to the user object
    next(); // proceed to the next middleware or route handler
  } catch (error) {
    return res.status(402).json({ message: 'Invalid token, Access denied' });
  }
};

export default authMiddleware;
