import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './modules/gateway.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule, { cors: true });
  app.use(cookieParser());
  await app.listen(3001);
}
bootstrap();
