import { PrismaService } from '@app/db';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async createOrder(userId: number, productId: number) {
    const order = await this.prisma.order.create({
      data: {
        userId: userId,
      },
    });

    await this.prisma.product.updateMany({
      where: {
        id: productId,
      },
      data: {
        orderId: order.id,
      },
    });

    return order;
  }
}
