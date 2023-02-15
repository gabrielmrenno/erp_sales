// Description: This file contains the AppError class, which is used to handle errors in the application.

export enum StatusCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export class AppError extends Error {
  public readonly message: string;

  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);

    this.message = message;
    this.statusCode = statusCode;
  }
}
