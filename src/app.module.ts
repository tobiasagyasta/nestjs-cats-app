import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [CatsModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
