class BadRequestException extends Error {
  constructor(message, statusCode = 400, field = null) {
    super(message);
    this.name = 'BadRequestException';
    this.statusCode = statusCode;
    this.error = field;
  }
}

class NotFoundException extends Error {
  constructor(message, statusCode = 404, field = null) {
    super(message);
    this.name = 'NotFoundException';
    this.statusCode = statusCode;
    this.error = field;
  }
}

class UnAuthorizedException extends Error {
  constructor(message, statusCode = 401) {
    super(message);
    this.name = 'UnAuthorizedException';
    this.statusCode = statusCode;
  }
}

class ForbiddenException extends Error {
  constructor(message, statusCode = 403, field = null) {
    super(message);
    this.name = 'ForbiddenException';
    this.statusCode = statusCode;
    this.error = field;
  }
}

class ConflictException extends Error {
  constructor(message, statusCode = 409, field = null) {
    super(message);
    this.name = 'ConflictException';
    this.statusCode = statusCode;
    this.error = field;
  }
}

class InternalServerException extends Error {
  constructor(message, statusCode = 500, field = null) {
    super(message);
    this.name = 'InternalServerException';
    this.statusCode = statusCode;
    this.error = field;
  }
}

class ServiceUnavailableException extends Error {
  constructor(message, statusCode = 503, field = null) {
    super(message);
    this.name = 'ServiceUnavailableException';
    this.statusCode = statusCode;
    this.error = field;
  }
}

class UnprocessableEntityException extends Error {
  constructor(message, statusCode = 422, field = null) {
    super(message);
    this.name = 'UnprocessableEntityException';
    this.statusCode = statusCode;
    this.error = field;
  }
}

module.exports = {
  BadRequestException,
  NotFoundException,
  UnAuthorizedException,
  ForbiddenException,
  ConflictException,
  InternalServerException,
  ServiceUnavailableException,
  UnprocessableEntityException,
};
