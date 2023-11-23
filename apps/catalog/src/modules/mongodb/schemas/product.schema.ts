import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ type: Number, index: true })
  _id: number;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  userId: number;

  @Prop()
  orderId: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
