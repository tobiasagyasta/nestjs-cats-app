import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { IUsersRepository } from './interfaces/users.repository.interface';
import { UserRole } from './common/user-role.enum';

@Injectable()
export class UsersRepository implements IUsersRepository {
  private users: User[] = [
    {
      id: '1',
      email: 'admin@example.com',
      password: 'hashedpassword',
      fullName: 'Admin User',
      roles: [UserRole.ADMIN],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  private nextId = 2;

  create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User {
    const newUser: User = {
      ...user,
      id: String(this.nextId++),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User | undefined {
    return this.users.find((user) => Number(user.id) === id);
  }

  update(id: number, update: Partial<Omit<User, 'id'>>): User | undefined {
    const user = this.findOne(id);
    if (user) {
      Object.assign(user, update, { updatedAt: new Date() });
      return user;
    }
    return undefined;
  }

  remove(id: number): boolean {
    const idx = this.users.findIndex((user) => Number(user.id) === id);
    if (idx !== -1) {
      this.users.splice(idx, 1);
      return true;
    }
    return false;
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }
}
