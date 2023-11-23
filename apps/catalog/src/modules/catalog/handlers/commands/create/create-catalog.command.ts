import { ICommand } from '@nestjs/cqrs';
import { CreateCatalogInput } from '../../../dto/create-catalog.input';

export class CreateCatalogCommand implements ICommand {
  constructor(
    public readonly createCatalogInput: CreateCatalogInput,
    public readonly userId: number,
  ) {}
}
