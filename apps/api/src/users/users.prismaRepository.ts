import { Injectable } from '@nestjs/common';
import { findById, UserRepository } from './users.repository.js';
import { PrismaRemoteRepository } from '../database/repositories/PrismaRemoteRepository.js';
import { User } from '@prisma/client';

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prisma: PrismaRemoteRepository) {}

  async findById({ id }: findById): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
