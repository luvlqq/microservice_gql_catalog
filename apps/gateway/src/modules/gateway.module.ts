import { Module } from '@nestjs/common';
import { AuthGatewayModule } from './auth/auth.module';
import { CartGatewayModule } from './cart/cart.module';
import { CatalogGatewayModule } from './catalog/catalog.module';
import { OrdersGatewayModule } from './orders/orders.module';

@Module({
  imports: [
    AuthGatewayModule,
    CartGatewayModule,
    CatalogGatewayModule,
    OrdersGatewayModule,
  ],
  controllers: [],
  providers: [],
})
export class GatewayModule {}
