import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCatalogByIdQuery } from './get-by-id.query';
import { CatalogService } from '../../../catalog.service';

@QueryHandler(GetCatalogByIdQuery)
export class GetCatalogByIdHandler
  implements IQueryHandler<GetCatalogByIdQuery>
{
  constructor(private readonly catalogService: CatalogService) {}

  public async execute(query: GetCatalogByIdQuery) {
    return this.catalogService.findOne(query.id);
  }
}
