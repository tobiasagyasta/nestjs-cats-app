import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  NotFoundException,
  InternalServerErrorException,
  ConflictException,
  ParseIntPipe,
} from '@nestjs/common';
import { SerializationInterceptor } from 'src/common/interceptors/serialization.interceptor';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/req/create-user.dto';
import { UpdateUserDto } from './dto/req/update-user.dto';
import { UserDetailResponseDto } from './dto/res/user-detail-response.dto';
import { CreatedUserResponseDto } from './dto/res/created-user-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(new SerializationInterceptor(CreatedUserResponseDto))
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const existing = await this.usersService.findByEmail(createUserDto.email);
      if (existing) {
        throw new ConflictException('User with this email already exists');
      }

      const user = await this.usersService.create(createUserDto);
      return user;
    } catch (err) {
      if (err instanceof ConflictException) throw err;
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      if (updateUserDto.email) {
        const existing = await this.usersService.findByEmail(
          updateUserDto.email,
        );
        if (existing && existing.id !== String(id)) {
          throw new ConflictException('User with this email already exists');
        }
      }

      const updated = await this.usersService.update(id, updateUserDto);
      if (!updated) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return updated;
    } catch (err) {
      if (err instanceof ConflictException || err instanceof NotFoundException)
        throw err;
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  @UseInterceptors(new SerializationInterceptor(UserDetailResponseDto))
  @Get()
  async findAll() {
    try {
      return await this.usersService.findAll();
    } catch {
      throw new InternalServerErrorException('Failed to fetch users');
    }
  }

  @UseInterceptors(new SerializationInterceptor(UserDetailResponseDto))
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.usersService.findOne(id);
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return user;
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException('Failed to fetch user');
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const removed = await this.usersService.remove(id);
      if (!removed) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return { message: `User with id ${id} has been removed.` };
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException('Failed to remove user');
    }
  }
}
