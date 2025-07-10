import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/req/create-user.dto';
import { UpdateUserDto } from './dto/req/update-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.usersRepository.create({
      ...createUserDto,
    });
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.findAll();
  }

  async findOne(id: number): Promise<User | undefined> {
    return await this.usersRepository.findOne(id);
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User | undefined> {
    return await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<boolean> {
    return await this.usersRepository.remove(id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.usersRepository.findByEmail(email);
  }
}
