import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCatalogByIdQuery } from './get-by-id.query';
import { MongodbService } from 'apps/catalog/src/modules/mongodb/mongodb.service';

@QueryHandler(GetCatalogByIdQuery)
export class GetCatalogByIdHandler
  implements IQueryHandler<GetCatalogByIdQuery>
{
  constructor(private readonly mongodbService: MongodbService) {}

  public async execute(query: GetCatalogByIdQuery) {
    return this.mongodbService.findOne(query.id);
  }
}
