import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RemoveCatalogCommand } from './delete-catalog.command';
import { CatalogService } from '../../../catalog.service';

@CommandHandler(RemoveCatalogCommand)
export class RemoveCatalogHandler
  implements ICommandHandler<RemoveCatalogCommand>
{
  constructor(private readonly catalogService: CatalogService) {}

  public async execute(command: RemoveCatalogCommand) {
    return this.catalogService.remove(command.id);
  }
}
