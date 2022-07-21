
const { CustomValidationError } = require('../handler/error/custom_validation_error');
const logger = require('../services/logger');

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode ? res.statusCode : 500;

  if (err instanceof CustomValidationError) {
    statusCode = err.status;
  }

  res.status(statusCode);
  logger.error(`${statusCode}:${err.stack} `);

  res.json({
    message: err.message,
    stack: err.stack,
  });
  next();
};

module.exports = {
  errorHandler,
};