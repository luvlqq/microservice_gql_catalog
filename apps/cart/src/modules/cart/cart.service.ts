import { Inject, Injectable } from '@nestjs/common';
import { CartRepository } from './cart.repository';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CartService {
  constructor(
    private readonly repository: CartRepository,
    @Inject('ORDER') private readonly cartClient: ClientProxy,
  ) {}
  public async createCart(userId: number, productId: number) {
    await lastValueFrom(
      this.cartClient.send('addToOrder', { userId, productId }),
    );
    return this.repository.addProductToCart(userId, productId);
  }

  public async findAll(userId: number) {
    return this.repository.getCart(userId);
  }
}
