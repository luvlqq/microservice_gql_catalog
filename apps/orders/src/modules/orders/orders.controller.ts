import { Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern('addToOrder')
  public async getFromCart(
    @Payload('userId') userId: number,
    @Payload('productId') productId: number,
  ) {
    return this.ordersService.addProductFromOrderToCart(userId, productId);
  }
}
