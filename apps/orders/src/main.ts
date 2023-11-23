import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './modules/orders/orders.module';
import { RmqService } from '@app/common/modules/rabbitmq/rabbitmq.service';
import { RmqOptions } from '@nestjs/microservices';
import { OrdersMicroserviceModule } from './modules/ordersMicroservice.module';

async function bootstrap() {
  const app = await NestFactory.create(OrdersMicroserviceModule, {
    cors: true,
  });
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice<RmqOptions>(rmqService.getOptions('ORDER', true));
  await app.startAllMicroservices();
  await app.listen(3005);
}
bootstrap();
