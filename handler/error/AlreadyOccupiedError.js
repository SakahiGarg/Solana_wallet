/* eslint-disable camelcase */
const {
  CustomValidationError,
} = require('./custom_validation_error');

class AlreadyOccupiedError extends CustomValidationError {
  constructor(
    message,
    request_user = null,
    request_params = null,
    request_body = null,
  ) {
    super(message, 400, 'unauthorized user access', request_user, request_params, request_body);

    this.name = 'AlreadyOccupiedError';
    this.status = 400;
    this.code = 'unauthorized user access';
  }
}

module.exports = {
  AlreadyOccupiedError,
};
