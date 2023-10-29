import { NestFactory } from '@nestjs/core';
import { CatalogMicroserviceModule } from './catalogMicroservice.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(CatalogMicroserviceModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3004);
}
bootstrap();
