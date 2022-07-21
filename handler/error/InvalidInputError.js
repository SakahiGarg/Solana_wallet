/* eslint-disable camelcase */
const { CustomValidationError } = require('./custom_validation_error');

class InvalidInputError extends CustomValidationError {
  constructor(
    message,
    request_user = null,
    request_params = null,
    request_body = null,
  ) {
    super(message, 400, 'Invalid Input Error', request_user, request_params, request_body);
    this.name = 'InvalidInputError';
    this.status = 400;
    this.code = 'Invalid Input';
  }
}

module.exports = {
  InvalidInputError,
};
