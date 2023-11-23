import { ObjectType, Field, Int, Directive } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id name description price")')
export class Catalog {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  price: number;
}
