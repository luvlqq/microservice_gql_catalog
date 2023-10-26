import { CreateCatalogInput } from './create-catalog.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCatalogInput extends PartialType(CreateCatalogInput) {
  @Field()
  id: number;
}
