import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { LocationsModule } from './locations/locations.module';

@Module({
  imports: [CatsModule, ProductsModule, UsersModule, LocationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
