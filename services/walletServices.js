const jwt = require('jsonwebtoken');

const tokenExpireTime = process.env.TOKENEXPIRETIME;
/** @description Generate JWT token */
const generateToken = (username) => jwt.sign({ username }, process.env.JWT_SECRET, {
  expiresIn: tokenExpireTime,
});

module.exports = {
  generateToken,
};