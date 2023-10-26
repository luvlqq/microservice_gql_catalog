import { Injectable } from '@nestjs/common';
import { CreateCatalogInput } from './dto/create-catalog.input';
import { UpdateCatalogInput } from './dto/update-catalog.input';
import { CatalogRepository } from './catalog.repository';
import { Catalog } from './entities/catalog.entity';

@Injectable()
export class CatalogService {
  constructor(private readonly repository: CatalogRepository) {}

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
      return this.repository.getProductById(id);
    } catch (e) {
      throw new Error(e);
    }
  }

  public async update(id: number, dto: UpdateCatalogInput) {
    return this.repository.updateProduct(id, dto);
  }

  public async remove(id: number) {
    try {
      return this.repository.deleteAProduct(id);
    } catch (e) {
      throw new Error(e);
    }
  }
}
