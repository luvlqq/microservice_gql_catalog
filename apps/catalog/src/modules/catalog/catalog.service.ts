import { Inject, Injectable } from '@nestjs/common';
import { CreateCatalogInput } from './dto/create-catalog.input';
import { UpdateCatalogInput } from './dto/update-catalog.input';
import { CatalogRepository } from './catalog.repository';
import { Catalog } from './entities/catalog.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class CatalogService {
  constructor(
    private readonly repository: CatalogRepository,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  public async create(userId: number, dto: CreateCatalogInput) {
    try {
      this.logger.info(
        `Product ${(dto.name, dto.description, dto.price)} created`,
        {
          service: CatalogService.name,
        },
      );
      return this.repository.createAProduct(userId, dto);
    } catch (e) {
      throw new Error(e);
    }
  }

  public async findAll(): Promise<Catalog[]> {
    try {
      this.logger.info(`Products findAll`, {
        service: CatalogService.name,
      });
      return this.repository.getAllProducts();
    } catch (e) {
      throw new Error(e);
    }
  }

  public async findOne(id: number) {
    try {
      const cachedData = await this.cacheService.get(id.toString());
      if (cachedData) {
        return cachedData;
      }
      const createdProduct = await this.repository.getProductById(id);
      await this.cacheService.set(id.toString(), createdProduct);
      const newCachedData = await this.cacheService.get(id.toString());
      this.logger.info(`Product with id ${id} was found`, {
        service: CatalogService.name,
      });
      return await newCachedData;
    } catch (e) {
      throw new Error(e);
    }
  }

  public async update(id: number, dto: UpdateCatalogInput) {
    try {
      this.logger.info(
        `Product with id ${id} was change to ${
          (dto.name, dto.description, dto.price)
        }`,
        {
          service: CatalogService.name,
        },
      );
      return this.repository.updateProduct(id, dto);
    } catch (e) {
      throw new Error(e);
    }
  }

  public async remove(id: number) {
    try {
      this.logger.info(`Product with id ${id} was deleted`, {
        service: CatalogService.name,
      });
      return this.repository.deleteAProduct(id);
    } catch (e) {
      throw new Error(e);
    }
  }
}
