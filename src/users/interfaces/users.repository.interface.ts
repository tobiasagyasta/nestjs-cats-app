import { User } from '../entities/user.entity';

export interface IUsersRepository {
  findAll(): Promise<User[]>;
  findOne(id: number): Promise<User | undefined>;
  create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
  update(
    id: number,
    update: Partial<Omit<User, 'id'>>,
  ): Promise<User | undefined>;
  remove(id: number): Promise<boolean>;
  findByEmail(email: string): Promise<User | undefined>;
}
