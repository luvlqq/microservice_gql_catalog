import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetAllCatalogsQuery } from './get-all-catalogs.query';
import { MongodbService } from 'apps/catalog/src/modules/mongodb/mongodb.service';

@QueryHandler(GetAllCatalogsQuery)
export class GetAllCatalogsHandler
  implements IQueryHandler<GetAllCatalogsQuery>
{
  constructor(private readonly mongodbService: MongodbService) {}

  public async execute() {
    return this.mongodbService.findAll();
  }
}
