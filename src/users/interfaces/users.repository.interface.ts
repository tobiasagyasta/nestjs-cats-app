import { User } from '../entities/user.entity';

export interface IUsersRepository {
  create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User;
  findAll(): User[];
  findOne(id: number): User | undefined;
  update(id: number, update: Partial<Omit<User, 'id'>>): User | undefined;
  remove(id: number): boolean;
  findByEmail(email: string): User | undefined;
}
