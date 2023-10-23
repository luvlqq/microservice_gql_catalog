import { Module } from '@nestjs/common';
import { OrdersGatewayResolver } from './orders.resolver';
import { OrdersGatewayService } from './orders.service';

@Module({
  imports: [],
  providers: [OrdersGatewayResolver, OrdersGatewayService],
  exports: [],
})
export class OrdersGatewayModule {}
