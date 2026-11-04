import { Injectable } from '@nestjs/common';
import {
  findByEmail,
  findById,
  UpdateActiveStatus,
  updateUser,
  UserRepository,
} from './users.repository.js';
import { PrismaRemoteRepository } from '../database/repositories/PrismaRemoteRepository.js';
import { User } from '@prisma/client';

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prisma: PrismaRemoteRepository) {}

  async findById({ id }: findById): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail({ email }: findByEmail): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update({ id, name, email }: updateUser): Promise<User> {
    return this.prisma.user.update({ where: { id }, data: { name, email } });
  }

  async updateActiveStatus({
    id,
    active,
  }: UpdateActiveStatus): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: { active },
    });
  }
}
