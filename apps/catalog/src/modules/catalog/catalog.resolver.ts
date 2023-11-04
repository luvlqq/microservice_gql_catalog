import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Catalog } from './entities/catalog.entity';
import { CreateCatalogInput } from './dto/create-catalog.input';
import { UpdateCatalogInput } from './dto/update-catalog.input';
import { CatalogResponse } from './responses';
import { UseInterceptors } from '@nestjs/common';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCatalogCommand } from './handlers/commands/create';
import { GetAllCatalogsQuery } from './handlers/queries/findAll';
import { GetCatalogByIdQuery } from './handlers/queries/findOne';
import { UpdateCatalogCommand } from './handlers/commands/update';
import { RemoveCatalogCommand } from './handlers/commands/delete';
import { GetCurrentUserId } from '@app/common/modules/auth/decorators';

@Resolver(() => Catalog)
export class CatalogResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => Catalog)
  createCatalog(
    @Args('createCatalogInput') createCatalogInput: CreateCatalogInput,
    @GetCurrentUserId() userId: number,
  ): Promise<CatalogResponse | any> {
    return this.commandBus.execute(
      new CreateCatalogCommand(createCatalogInput, userId),
    );
  }

  @Query(() => [Catalog], { name: 'catalogs' })
  findAll(): Promise<CatalogResponse[]> {
    return this.queryBus.execute(new GetAllCatalogsQuery());
  }

  @UseInterceptors(CacheInterceptor)
  @CacheKey('findByIdCatalog')
  @CacheTTL(30)
  @Query(() => Catalog, { name: 'catalog' })
  findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<CatalogResponse | unknown> {
    return this.queryBus.execute(new GetCatalogByIdQuery(id));
  }

  @Mutation(() => Catalog)
  updateCatalog(
    @Args('updateCatalogInput') updateCatalogInput: UpdateCatalogInput,
  ): Promise<CatalogResponse> {
    return this.commandBus.execute(
      new UpdateCatalogCommand(updateCatalogInput.id, updateCatalogInput),
    );
  }

  @Mutation(() => Catalog)
  removeCatalog(@Args('id', { type: () => Int }) id: number) {
    return this.commandBus.execute(new RemoveCatalogCommand(id));
  }
}
