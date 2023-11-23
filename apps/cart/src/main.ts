import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { cartMicroserviceModule } from './cartMicroservice.module';

async function bootstrap() {
  const app = await NestFactory.create(cartMicroserviceModule, { cors: true });
  app.use(cookieParser());
  await app.listen(3003);
}
bootstrap();
