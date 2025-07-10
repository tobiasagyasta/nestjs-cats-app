import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  console.log('[CONFIG] Database user:', configService.get('DATABASE_USER'));
  console.log(
    '[CONFIG] Database password:',
    configService.get('DATABASE_PASSWORD'),
  );
  console.log('[CONFIG] Database name:', configService.get('DATABASE_NAME'));
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.use(new LoggerMiddleware().use);
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
