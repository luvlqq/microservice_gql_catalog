import { NestFactory } from '@nestjs/core';
import { AuthMicroserviceModule } from './modules/authMicroservice.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AuthMicroserviceModule);
  app.use(cookieParser());
  await app.listen(3002);
}
bootstrap();
