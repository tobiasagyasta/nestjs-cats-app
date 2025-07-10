import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [CatsController],
  providers: [CatsService], // Provider, service, usecase, etc.
})
export class CatsModule {}
