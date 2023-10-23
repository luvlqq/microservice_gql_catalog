import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './modules/orders/orders.module';

async function bootstrap() {
  const app = await NestFactory.create(OrdersModule);
  await app.listen(3005);
}
bootstrap();
