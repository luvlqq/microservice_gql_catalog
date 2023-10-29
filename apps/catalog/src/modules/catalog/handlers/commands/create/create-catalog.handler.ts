import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCatalogCommand } from './create-catalog.command';
import { CatalogService } from '../../../catalog.service';

@CommandHandler(CreateCatalogCommand)
export class CreateCatalogHandler
  implements ICommandHandler<CreateCatalogCommand>
{
  constructor(private readonly catalogService: CatalogService) {}

  public async execute(command: CreateCatalogCommand) {
    return this.catalogService.create(command.createCatalogInput);
  }
}
