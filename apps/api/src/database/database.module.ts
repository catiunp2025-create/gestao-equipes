import { Module } from '@nestjs/common';
import { PrismaRemoteRepository } from './repositories/PrismaRemoteRepository.js';

@Module({
  providers: [PrismaRemoteRepository],
  exports: [PrismaRemoteRepository],
})
export class DatabaseModule {}
