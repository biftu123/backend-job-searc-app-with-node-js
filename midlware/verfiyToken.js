const user = require('../model/user');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "job", async (err, user) => {
      if (err) {
        console.error('Error verifying token:', err); // Log any errors
        res.status(400).json('Invalid token');
      } else {
        req.user = user;
        console.log('Decoded user:', user); // Log decoded user information
        console.log('User role:', req.user.isAdmin); // Specifically log the role
        next();
      }
    });
  } else {
    console.warn('Missing token in request headers'); // Log missing token
    res.status(403).json("You are not authenticated");
  }
};

const verifyAndAuthorized = async (req, res, next) => {
  verifyToken(req, res, () => {
    console.log('User role in verifyAndAuthorized:', req.user.role); // Log the role again
    if (req.user.isAdmin) {
      next();
    } else {
      console.warn('Unauthorized access attempt'); // Log unauthorized access
      res.status(403).json('This operation is not allowed');
    }
  });
};

const verifyisAdmin = async (req, res, next) => {
  verifyToken(req, res, () => {
    console.log('User role in verifyisAdmin:', req.user.isAdmin); // Log the role again
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json('This operation is not allowed');
    }
  });
};

module.exports = { verifyToken, verifyAndAuthorized, verifyisAdmin };
