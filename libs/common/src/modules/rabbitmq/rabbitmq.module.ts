import { Module } from '@nestjs/common';
import { RabbitMqService } from './rabbitmq.service';

@Module({
  imports: [],
  providers: [RabbitMqService],
  exports: [RabbitMqService],
})
export class RabbitMqModule {}
