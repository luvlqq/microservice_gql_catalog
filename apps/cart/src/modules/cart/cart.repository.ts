import { PrismaService } from '@app/db';
import { Injectable } from '@nestjs/common';
import { Cart } from '@prisma/client';

@Injectable()
export class CartRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async getCart(userId: number): Promise<Cart[]> {
    return this.prisma.cart.findMany({
      where: { userId: userId },
      include: { products: true },
    });
  }

  public async addProductToCart(userId: number, productId: number) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) throw new Error('Product not found');

    let cart = await this.prisma.cart.findUnique({
      where: { userId: userId },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({ data: { userId: userId } });
    }

    await this.prisma.product.update({
      where: { id: productId },
      data: { cartId: cart.id },
    });

    // Возвращаем корзину с продуктами
    return this.prisma.cart.findUnique({
      where: { id: cart.id },
      include: { products: true },
    });
  }

  public async deleteProductInCart() {}
}
