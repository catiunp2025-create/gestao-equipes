import { ConflictException } from '@nestjs/common';

export class HttpConflictError extends ConflictException {
  public statusCode!: number;
  public message!: string;
  public error!: string;

  constructor(message: string, error: string) {
    super(message, error);
  }
}
