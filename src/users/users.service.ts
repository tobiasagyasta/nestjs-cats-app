import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/req/create-user.dto';
import { UpdateUserDto } from './dto/req/update-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  create(createUserDto: CreateUserDto): User {
    return this.usersRepository.create({
      ...createUserDto,
    });
  }

  findAll(): User[] {
    return this.usersRepository.findAll();
  }

  findOne(id: number): User | undefined {
    return this.usersRepository.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto): User | undefined {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: number): boolean {
    return this.usersRepository.remove(id);
  }

  findByEmail(email: string): User | undefined {
    return this.usersRepository.findByEmail(email);
  }
}
