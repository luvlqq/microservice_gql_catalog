import { IQuery } from '@nestjs/cqrs';

export class GetCatalogByIdQuery implements IQuery {
  constructor(public readonly id: number) {}
}
