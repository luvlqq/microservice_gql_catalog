import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCatalogInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  price: number;
}
