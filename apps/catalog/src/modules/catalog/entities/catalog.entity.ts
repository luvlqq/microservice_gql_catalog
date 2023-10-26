import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Catalog {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  price: number;
}
