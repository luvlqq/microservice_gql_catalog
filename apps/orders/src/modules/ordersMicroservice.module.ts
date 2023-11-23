import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { RmqModule } from '@app/common/modules/rabbitmq/rabbitmq.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    OrdersModule,
    AuthModule,
    RmqModule.register({ name: 'ORDER' }),
  ],
})
export class OrdersMicroserviceModule {}
