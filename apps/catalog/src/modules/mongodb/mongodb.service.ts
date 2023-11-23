import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class MongodbService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  public async findAll(): Promise<Product[]> {
    return await this.productModel.find();
  }

  public async findOne(_id: number): Promise<Product> {
    return this.productModel.findById(_id);
  }
}
