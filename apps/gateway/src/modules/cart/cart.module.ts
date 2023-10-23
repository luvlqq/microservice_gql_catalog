import { Module } from '@nestjs/common';
import { CartGatewayResolver } from './cart.resolver';
import { CartGatewayService } from './cart.service';

@Module({
  imports: [],
  providers: [CartGatewayResolver, CartGatewayService],
  exports: [],
})
export class CartGatewayModule {}
