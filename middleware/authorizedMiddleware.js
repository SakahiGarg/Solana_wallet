const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const { UnAuthorizedError } = require('../handler/error/UnAuthorizedError');
const { InvalidInputError } = require('../handler/error/InvalidInputError');
const walletDetails = require('../models/walletModel');

const authorizedRoute = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // get token from header
      // eslint-disable-next-line prefer-destructuring
      token = req.headers.authorization.split(' ')[1];

      // verfiy token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // getUser from the token
      req.wallet = await walletDetails.findOne({username:decoded.username});
      if (!req.wallet) {
        throw new UnAuthorizedError('Authorization Error: User not found');
      }
      next();
    } catch (error) {
      throw new UnAuthorizedError('Not Authorized');
    }
  }

  if (!token) {
    throw new InvalidInputError('Not authorized, no token');
  }
});

module.exports = { authorizedRoute };