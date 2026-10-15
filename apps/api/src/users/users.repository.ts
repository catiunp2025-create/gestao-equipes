import { User } from '@prisma/client';

export interface findById {
  id: string;
}

export abstract class UserRepository {
  abstract findById({ id }: findById): Promise<User | null>;
}
