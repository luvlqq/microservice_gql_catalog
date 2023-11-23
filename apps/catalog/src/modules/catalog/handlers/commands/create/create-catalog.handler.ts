import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCatalogCommand } from './create-catalog.command';
import { CatalogService } from '../../../catalog.service';
import { MongodbService } from 'apps/catalog/src/modules/mongodb/mongodb.service';

@CommandHandler(CreateCatalogCommand)
export class CreateCatalogHandler
  implements ICommandHandler<CreateCatalogCommand>
{
  constructor(
    private readonly catalogService: CatalogService,
    private readonly mongoService: MongodbService,
  ) {}

  public async execute(command: CreateCatalogCommand) {
    return this.catalogService.create(
      command.userId,
      command.createCatalogInput,
    );
  }
}
