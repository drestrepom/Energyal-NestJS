import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException {
  getExecptio(err?: any, res?: any, message?: string) {
    if (err) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: err,
      }, 400);
    }
    if (!res) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: message,
      }, 400);
    }
  }

  saveExceptio(reason) {
    if (reason.name) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: reason,
      }, 403);
    }
    throw new HttpException({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      error: reason,
    }, 500);
  }
}
