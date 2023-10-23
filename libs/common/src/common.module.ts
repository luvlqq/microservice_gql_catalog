import { Module } from '@nestjs/common';
import { RabbitMqModule } from './modules/rabbitmq/rabbitmq.module';
import { WinstonModule } from './modules/winston/winston.module';

@Module({
  imports: [RabbitMqModule, WinstonModule],
  providers: [],
  exports: [],
})
export class CommonModule {}
