import { Injectable } from '@nestjs/common';
import { UserRepository } from '../users.repository';

@Injectable()
export class ListAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute() {
    return await this.userRepository.listAllUsers();
  }
}
