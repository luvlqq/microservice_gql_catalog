import { ICommand } from '@nestjs/cqrs';
import { UpdateCatalogInput } from '../../../dto/update-catalog.input';

export class UpdateCatalogCommand implements ICommand {
  constructor(
    public readonly id: number,
    public readonly updateCatalogInput: UpdateCatalogInput,
  ) {}
}
