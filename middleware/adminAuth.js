const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if Authorization header is present
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.error('❌ Missing or invalid Authorization header');
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }

  // ✅ Extract token correctly
  const token = authHeader.split(' ')[1];

  console.log('✅ Raw Authorization Header:', authHeader);
  console.log('✅ Extracted Token:', token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Check if the user is admin
    if (!decoded.is_admin) {
      return res.status(403).json({ error: 'Forbidden - Not an admin' });
    }

    req.admin = decoded;
    next();
  } catch (err) {
    console.error('❌ Token verification failed:', err.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = adminAuth;
