/* eslint-disable camelcase */
const {
  CustomValidationError,
} = require('./custom_validation_error');

class UnAuthorizedError extends CustomValidationError {
  constructor(
    message,
    request_user = null,
    request_params = null,
    request_body = null,
  ) {
    super(message, 403, 'unauthorized user access', request_user, request_params, request_body);

    this.name = 'UnAuthorizedError';
    this.status = 403;
    this.code = 'unauthorized user access';
  }
}

module.exports = {
  UnAuthorizedError,
};
