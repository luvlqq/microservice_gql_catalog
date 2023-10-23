import { Module } from '@nestjs/common';
import { WinstonService } from './winston.service';
import { RabbitMqService } from '../rabbitmq/rabbitmq.service';

@Module({
  imports: [],
  providers: [WinstonService],
  exports: [RabbitMqService],
})
export class WinstonModule {}
