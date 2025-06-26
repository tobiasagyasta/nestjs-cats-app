import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './DTOs/create-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() CreateCatDto: CreateCatDto) {
    return this.catsService.create({
      ...CreateCatDto,
      birthdate: new Date(CreateCatDto.birthdate),
    });
  }

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.findOne(id);
  }
  @Get(':id/age')
  getAge(@Param('id', ParseIntPipe) id: number) {
    const cat = this.catsService.findOne(id);
    const age = this.catsService.calculateAge(cat.birthdate);
    return `Cat with id ${id} and name ${cat.name} is ${age} years old.`;
  }
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCatDto: Partial<CreateCatDto>,
  ) {
    return this.catsService.update(id, {
      ...updateCatDto,
      birthdate: updateCatDto.birthdate
        ? new Date(updateCatDto.birthdate)
        : undefined,
    });
  }
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    this.catsService.remove(id);
    return { message: `Cat with id ${id} has been removed.` };
  }
}
