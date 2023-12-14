// middleware/verifyToken.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, "my-32-character-ultra-secure-and-ultra-long-secret", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: `Unauthorized: ${JSON.stringify(err)}` });
    }

    // Attach the decoded user information to the request for later use
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
