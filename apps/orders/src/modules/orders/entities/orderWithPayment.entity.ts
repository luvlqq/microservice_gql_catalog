import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class OrderWithPaymentUrl {
  @Field(() => Int)
  orderId: number;

  @Field()
  paymentIntentId: string;

  @Field()
  paymentUrl: string;
}
