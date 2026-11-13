import { Injectable } from '@nestjs/common';
import { UserRepository } from '../users.repository';
import { UserEmailAlreadyExist } from '../errors/UserEmailAlreadyExist';
import * as bcrypt from 'bcrypt';

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ name, email, password }: CreateUserRequest) {
    const existingUser = await this.userRepository.findByEmail({ email });

    if (existingUser) {
      throw new UserEmailAlreadyExist();
    }

    const passwordHash = await bcrypt.hash(password, 10);

    return await this.userRepository.createUser({
      name,
      email,
      password: passwordHash,
    });
  }
}
