/* eslint-disable camelcase */
const {
  CustomValidationError,
} = require('./custom_validation_error');

class NotFoundError extends CustomValidationError {
  constructor(
    message,
    request_user = null,
    request_params = null,
    request_body = null,
  ) {
    super(message, 404, 'Not Found Error', request_user, request_params, request_body);

    this.name = 'NotFoundError';
    this.status = 404;
    this.code = 'Invalid_Input';
  }
}

module.exports = {
  NotFoundError,
};
