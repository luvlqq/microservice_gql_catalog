import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Catalog {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
