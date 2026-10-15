import { Module } from '@nestjs/common';
import { UsersController } from './users.controller.js';
import { UserPrismaRepository } from './users.prismaRepository.js';
import { GetUserUseCase } from './usecases/GetUserUseCase.js';
import { UserRepository } from './users.repository.js';
import { DatabaseModule } from '../database/database.module.js';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    {
      provide: UserRepository,
      useClass: UserPrismaRepository,
    },
    GetUserUseCase,
  ],
  exports: [GetUserUseCase],
})
export class UsersModule {}
