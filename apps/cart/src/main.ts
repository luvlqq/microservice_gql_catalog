import { NestFactory } from '@nestjs/core';
import { CartModule } from './modules/cart/cart.module';

async function bootstrap() {
  const app = await NestFactory.create(CartModule);
  await app.listen(3003);
}
bootstrap();
