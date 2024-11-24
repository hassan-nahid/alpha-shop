import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Get the token

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token
    req.user = decoded; // Attach the user info to the request object
    next(); // Proceed to the next middleware
  } catch (err) {
    console.error("JWT Error:", err.message); // Log error if token verification fails
    res.status(400).json({ error: 'Invalid token.' });
  }
};

export default authenticate;
