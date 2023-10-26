import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCartInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
