import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';
import { GetCurrentUserId } from '@app/common/modules/auth/decorators';

@Resolver(() => Cart)
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @Mutation(() => Cart)
  createCart(
    @Args('productId') productId: number,
    @GetCurrentUserId() userId: number,
  ) {
    return this.cartService.createCart(userId, productId);
  }

  @Query(() => [Cart], { name: 'cart' })
  findAll(@GetCurrentUserId() userId: number) {
    return this.cartService.findAll(userId);
  }
}
