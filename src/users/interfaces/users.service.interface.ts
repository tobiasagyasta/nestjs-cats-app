import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/req/create-user.dto';
import { UpdateUserDto } from '../dto/req/update-user.dto';

export interface IUsersService {
  create(createUserDto: CreateUserDto): User;
  findAll(): User[];
  findOne(id: number): User | undefined;
  update(id: number, updateUserDto: UpdateUserDto): User | undefined;
  remove(id: number): boolean;
  findByEmail(email: string): User | undefined;
}
