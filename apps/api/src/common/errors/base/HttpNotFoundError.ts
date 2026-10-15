import { NotFoundException } from '@nestjs/common';

export class HttpNotFoundError extends NotFoundException {
  public statusCode!: number;
  public message!: string;
  public error!: string;

  constructor(message: string, error: string) {
    super(message, error);
  }
}
