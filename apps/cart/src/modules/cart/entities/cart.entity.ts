import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Catalog } from 'apps/catalog/src/modules/catalog/entities/catalog.entity';

@ObjectType()
export class Cart {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  userId: number;

  @Field(() => [Catalog])
  products: Catalog[];
}
