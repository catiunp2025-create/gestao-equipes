import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../users.repository.js';
import { GetUserUseCase } from './GetUserUseCase.js';

interface UpdateActiveStatusRequest {
  id: string;
  active: boolean;
}

@Injectable()
export class UpdateActiveStatusUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly getUserUseCase: GetUserUseCase,
  ) {}

  async execute({ id, active }: UpdateActiveStatusRequest) {
    const user = await this.getUserUseCase.execute({ id });

    if (user.active === active) {
      throw new BadRequestException(
        `User is already ${active ? 'active' : 'inactive'}.`,
      );
    }

    return await this.userRepository.updateActiveStatus({ id, active });
  }
}
