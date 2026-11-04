import { User } from '@prisma/client';

export interface findById {
  id: string;
}

export interface findByEmail {
  email: string;
}

export interface updateUser {
  id: string;
  name?: string;
  email?: string;
}

export interface UpdateActiveStatus {
  id: string;
  active: boolean;
}

export abstract class UserRepository {
  abstract findById({ id }: findById): Promise<User | null>;
  abstract update({ id, name, email }: updateUser): Promise<User>;
  abstract findByEmail({ email }: findByEmail): Promise<User | null>;
  abstract updateActiveStatus({
    id,
    active,
  }: UpdateActiveStatus): Promise<User>;
}
