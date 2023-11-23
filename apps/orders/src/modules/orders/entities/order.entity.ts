import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Catalog } from 'apps/catalog/src/modules/catalog/entities/catalog.entity';

@ObjectType()
export class Order {
  @Field(() => Int)
  id: number;

  @Field()
  orderDate: Date;

  @Field(() => Int)
  userId: number;

  @Field(() => [Catalog])
  products: Catalog[];
}
