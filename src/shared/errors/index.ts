export class InternalServerError extends Error {
  public success: boolean;
  public status: number;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.status = 500;
    this.success = false;
  }
}

export class BadRequestError extends Error {
  public success: boolean;
  public status: number;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.status = 400;
    this.success = false;
  }
}

export class UnauthorizedError extends Error {
  public success: boolean;
  public status: number;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.status = 401;
    this.success = false;
  }
}

export class NotFoundError extends Error {
  public success: boolean;
  public status: number;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.status = 404;
    this.success = false;
  }
}

export class ForbiddenError extends Error {
  public success: boolean;
  public status: number;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.status = 403; // Set the status code for Forbidden
    this.success = false;
  }
}

export class NotAcceptableError extends Error {
  public success: boolean;
  public status: number;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.status = 406; // Set the status code for Not Acceptable
    this.success = false;
  }
}

export class RequestTimeoutError extends Error {
  public success: boolean;
  public status: number;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.status = 408; // Set the status code for Request Timeout
    this.success = false;
  }
}

export class ConflictError extends Error {
  public success: boolean;
  public status: number;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.status = 409; // Set the status code for Conflict
    this.success = false;
  }
}