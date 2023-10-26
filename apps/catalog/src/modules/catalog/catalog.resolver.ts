import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CatalogService } from './catalog.service';
import { Catalog } from './entities/catalog.entity';
import { CreateCatalogInput } from './dto/create-catalog.input';
import { UpdateCatalogInput } from './dto/update-catalog.input';
import { CatalogResponse } from './responses';

@Resolver(() => Catalog)
export class CatalogResolver {
  constructor(private readonly catalogService: CatalogService) {}

  @Mutation(() => Catalog)
  createCatalog(
    @Args('createCatalogInput') createCatalogInput: CreateCatalogInput,
  ): Promise<CatalogResponse> {
    return this.catalogService.create(createCatalogInput);
  }

  //! Не хочет выводиться весь список товаров !
  @Query(() => [Catalog], { name: 'catalog' })
  findAll(): Promise<CatalogResponse[]> {
    return this.catalogService.findAll();
  }

  @Query(() => Catalog, { name: 'catalog' })
  findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<CatalogResponse> {
    return this.catalogService.findOne(id);
  }

  @Mutation(() => Catalog)
  updateCatalog(
    @Args('updateCatalogInput') updateCatalogInput: UpdateCatalogInput,
  ): Promise<CatalogResponse> {
    return this.catalogService.update(
      updateCatalogInput.id,
      updateCatalogInput,
    );
  }

  @Mutation(() => Catalog)
  removeCatalog(@Args('id', { type: () => Int }) id: number) {
    return this.catalogService.remove(id);
  }
}
