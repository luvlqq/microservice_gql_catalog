import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { CreateOrderInput } from './dto/create-order.input';
import { OrderWithPaymentUrl } from './entities/orderWithPayment.entity';
import { GetCurrentUserId } from '@app/common/modules/auth/decorators';

@Resolver(() => OrderWithPaymentUrl)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @Mutation(() => OrderWithPaymentUrl)
  async createOrder(
    @GetCurrentUserId() userId: number,
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
  ) {
    const order = await this.ordersService.createOrder(
      userId,
      createOrderInput,
    );
    const paymentUrl = await this.ordersService.redirectToCheckout(
      order.orderId,
    );
    return {
      orderId: order.orderId,
      paymentIntentId: order.paymentIntendId,
      paymentUrl,
    };
  }
}
