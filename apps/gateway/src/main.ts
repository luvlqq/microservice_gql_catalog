import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './modules/gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  await app.listen(3001);
}
bootstrap();
