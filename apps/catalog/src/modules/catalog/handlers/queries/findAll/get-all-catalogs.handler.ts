import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetAllCatalogsQuery } from './get-all-catalogs.query';
import { CatalogService } from '../../../catalog.service';

@QueryHandler(GetAllCatalogsQuery)
export class GetAllCatalogsHandler
  implements IQueryHandler<GetAllCatalogsQuery>
{
  constructor(private readonly catalogService: CatalogService) {}

  public async execute() {
    return this.catalogService.findAll();
  }
}
