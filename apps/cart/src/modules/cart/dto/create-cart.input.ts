import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateCartInput {
  @Field(() => Int)
  productId: number;

  @Field()
  quantity: number;
}
