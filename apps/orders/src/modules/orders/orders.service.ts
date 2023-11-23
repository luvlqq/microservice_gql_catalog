import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaService } from '@app/db';
import { OrdersRepository } from './orders.repository';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OrdersService {
  private stripe: Stripe;
  constructor(
    @Inject('ORDER') private meetupClient: ClientProxy,
    private readonly prisma: PrismaService,
    private readonly repository: OrdersRepository,
    private readonly configService: ConfigService,
  ) {
    const key = this.configService.get('SECRET_KEY');
    this.stripe = new Stripe(key, {
      apiVersion: '2023-10-16',
    });
  }

  public async createOrder(userId: number, createOrderInput: CreateOrderInput) {
    const product = await this.prisma.product.findUnique({
      where: { id: createOrderInput.productId },
    });

    if (!product) throw new Error('Product not found');

    const paymentIntend = await this.stripe.paymentIntents.create({
      amount: product.price,
      currency: 'usd',
    });

    const order = await this.addProductFromOrderToCart(
      userId,
      createOrderInput.productId,
    );

    return {
      orderId: order.id,
      paymentIntendId: paymentIntend.id,
    };
  }

  public async redirectToCheckout(orderId: number) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { products: true },
    });

    if (!order) throw new Error('Order not found!');

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: order.products.map((product) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
          },
          unit_amount: product.price,
        },
        quantity: 1,
      })),
      mode: 'payment',
      success_url: 'http://localhost:3001/sucess',
      cancel_url: 'http://localhost:3001/cancel',
    });
    return session.url;
  }

  public async addProductFromOrderToCart(userId: number, productId: number) {
    return this.repository.createOrder(userId, productId);
  }
}
