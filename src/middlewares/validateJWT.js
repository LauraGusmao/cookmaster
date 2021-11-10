const jwt = require('jsonwebtoken');

const secret = 'cookmaster';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'missing token' });
  }

  // Ref: https://www.npmjs.com/package/jsonwebtoken
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'jwt malformed' });
    }

    const id = '_id';

    req.userId = decoded[id];

    next();
  });
};
