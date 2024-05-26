const { verifyToken } = require('../utils/jwt');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ errorMessage: 'Token required' });

  try {
    req.user = verifyToken(token);
    next();
  } catch (err) {
    res.status(401).json({ errorMessage: 'Invalid token' });
  }
};

module.exports = { authenticateToken };
