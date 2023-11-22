const jwt = require('jsonwebtoken');

const checkAuthentication = (req, res, next) => {
  const authHeader = req.header('Authorication');

  if (!authHeader) {
    return res.status(401).json({
      status: 'fail',
      message: 'Unauthorized',
    });
  }

  const tokenParts = authHeader.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).json({
      status: 'fail',
      message: 'Unauthorized',
    });
  }

  const token = tokenParts[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({
        status: 'fail',
        message: 'Token is not valid',
      });
    }

    req.user = user;

    next();
  });
};

module.exports = checkAuthentication;
