import { Injectable } from '@nestjs/common';
import { UserRepository } from '../users.repository.js';
import { GetUserUseCase } from './GetUserUseCase.js';
import { UserEmailAlreadyExist } from '../errors/UserEmailAlreadyExist.js';

interface UpdateUserRequest {
  id: string;
  name?: string;
  email?: string;
}

@Injectable()
export class UpdateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly getUserUseCase: GetUserUseCase,
  ) {}

  async execute({ id, name, email }: UpdateUserRequest) {
    const user = await this.getUserUseCase.execute({ id });

    if (!user.active) {
      throw new Error('User not found');
    }

    if (email && email !== user.email) {
      const existingUser = await this.userRepository.findByEmail({ email });
      if (existingUser) {
        throw new UserEmailAlreadyExist();
      }
    }

    return await this.userRepository.update({ id, name, email });
  }
}
