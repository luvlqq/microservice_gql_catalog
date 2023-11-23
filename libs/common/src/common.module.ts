import { Module } from '@nestjs/common';
import { RmqModule } from './modules/rabbitmq/rabbitmq.module';
import { WinstonModule } from './modules/winston/winston.module';
import { RmqService } from './modules/rabbitmq/rabbitmq.service';

@Module({
  imports: [RmqModule, WinstonModule],
  providers: [RmqService],
  exports: [RmqModule],
})
export class CommonModule {}
