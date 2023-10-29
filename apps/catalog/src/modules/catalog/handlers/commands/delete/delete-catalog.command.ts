import { ICommand } from '@nestjs/cqrs';

export class RemoveCatalogCommand implements ICommand {
  constructor(public readonly id: number) {}
}
