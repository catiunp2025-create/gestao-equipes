import { Injectable } from '@nestjs/common';
import { UserRepository } from '../users.repository.js';
import { UserNotFound } from '../errors/UserNotFound.js';

interface Request {
  id: string;
}

@Injectable()
export class GetUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute({ id }: Request) {
    const user = await this.repository.findById({ id });

    if (!user) {
      throw new UserNotFound();
    }

    return user;
  }
}
