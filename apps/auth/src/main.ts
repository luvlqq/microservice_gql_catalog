import { NestFactory } from '@nestjs/core';
import { AuthMicroserviceModule } from './modules/auth/auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthMicroserviceModule);
  await app.listen(3002);
}
bootstrap();
