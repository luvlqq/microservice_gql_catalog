import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAuthInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
