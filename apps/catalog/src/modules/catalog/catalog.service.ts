import { Inject, Injectable } from '@nestjs/common';
import { CreateCatalogInput } from './dto/create-catalog.input';
import { UpdateCatalogInput } from './dto/update-catalog.input';
import { CatalogRepository } from './catalog.repository';
import { Catalog } from './entities/catalog.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CatalogService {
  constructor(
    private readonly repository: CatalogRepository,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  public async create(dto: CreateCatalogInput) {
    try {
      return this.repository.createAProduct(dto);
    } catch (e) {
      throw new Error(e);
    }
  }

  public async findAll(): Promise<Catalog[]> {
    try {
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
      return await newCachedData;
    } catch (e) {
      throw new Error(e);
    }
  }

  public async update(id: number, dto: UpdateCatalogInput) {
    try {
      return this.repository.updateProduct(id, dto);
    } catch (e) {
      throw new Error(e);
    }
  }

  public async remove(id: number) {
    try {
      return this.repository.deleteAProduct(id);
    } catch (e) {
      throw new Error(e);
    }
  }
}
