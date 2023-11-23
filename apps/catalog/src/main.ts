import { NestFactory } from '@nestjs/core';
import { CatalogMicroserviceModule } from './catalogMicroservice.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(CatalogMicroserviceModule, {
    cors: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  await app.listen(3004);
}
bootstrap();
