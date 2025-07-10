import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { LocationsModule } from './locations/locations.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    CatsModule,
    ProductsModule,
    UsersModule,
    LocationsModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
