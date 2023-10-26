import { NestFactory } from '@nestjs/core';
import { CatalogMicroserviceModule } from './catalogMicroservice.module';

async function bootstrap() {
  const app = await NestFactory.create(CatalogMicroserviceModule);
  await app.listen(3004);
}
bootstrap();
