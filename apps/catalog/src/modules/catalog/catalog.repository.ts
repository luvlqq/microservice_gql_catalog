import { PrismaService } from '@app/db';
import { Injectable } from '@nestjs/common';
import { CreateCatalogInput } from './dto/create-catalog.input';
import { UpdateCatalogInput } from './dto/update-catalog.input';

@Injectable()
export class CatalogRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async getAllProducts() {
    return await this.prisma.product.findMany();
  }

  public async getProductById(id: number) {
    return await this.prisma.product.findUnique({ where: { id: id } });
  }

  public async createAProduct(userId: number, dto: CreateCatalogInput) {
    return await this.prisma.product.create({
      data: { ...dto, userId: userId },
    });
  }

  public async updateProduct(id: number, dto: UpdateCatalogInput) {
    return await this.prisma.product.update({
      where: { id },
      data: { ...dto },
    });
  }

  public async deleteAProduct(id: number) {
    return await this.prisma.product.delete({ where: { id: id } });
  }
}
