const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // expects header: Authorization: Bearer <token>
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  if (!authHeader) return res.status(401).json({ error: 'No token, authorization denied' });

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'Invalid auth header' });

  const token = parts[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // attach user info to request
    req.user = { id: decoded.id, role: decoded.role, email: decoded.email };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token is not valid' });
  }
};
