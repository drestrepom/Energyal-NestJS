import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException {

  static serverError = (err) => {
    if (err) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: err,
      }, 500);
    }
  };

  static getExecptio(err?: any, res?: any, message?: string) {
    if (err) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: err,
      }, 400);
    }
    if (!res) {
      return Promise.reject(new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: message,
      }, 400));
    }
  }

  static internalError(error): HttpException {
    return new HttpException({
      error,
    }, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  static noResults(message: string): HttpException {
    return new HttpException({
      error: message,
    }, HttpStatus.BAD_REQUEST);
  }

  static clientError(message): HttpException {
    return new HttpException({
      error: message,
    }, HttpStatus.BAD_REQUEST);
  }

  static saveExceptio(err) {
    if (err.name) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: err,
      }, 403);
    }
    if (err) {
      this.serverError(err);
    }
  }

  static updateExceptio(err, res) {
    if (err) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: err,
      }, 403);
    }
    if (!res) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'No se ha encontrado',
      }, 403);
    }
    if (err) {
      this.serverError(err);
    }
  }

}
