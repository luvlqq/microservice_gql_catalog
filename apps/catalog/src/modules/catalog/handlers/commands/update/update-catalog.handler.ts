import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCatalogCommand } from './update-catalog.command';
import { CatalogService } from '../../../catalog.service';

@CommandHandler(UpdateCatalogCommand)
export class UpdateCatalogHandler
  implements ICommandHandler<UpdateCatalogCommand>
{
  constructor(private readonly catalogService: CatalogService) {}

  public async execute(command: UpdateCatalogCommand) {
    return this.catalogService.update(command.id, command.updateCatalogInput);
  }
}
