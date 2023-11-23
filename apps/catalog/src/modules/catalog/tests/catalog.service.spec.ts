import { Test, TestingModule } from '@nestjs/testing';
import { CatalogService } from '../catalog.service';
import { CatalogRepository } from '../catalog.repository';
import { MyLoggerModule } from '@app/common/modules/winston/winston.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { PrismaModule } from '@app/db';
import { CreateCatalogInput } from '../dto/create-catalog.input';
import { Catalog } from '../entities/catalog.entity';

describe('CatalogService', () => {
  let service: CatalogService;
  let repository: CatalogRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatalogService, CatalogRepository],
      imports: [
        MyLoggerModule,
        PrismaModule,
        CacheModule.register({
          isGlobal: true,
          store: redisStore,
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT,
        }),
      ],
    }).compile();

    service = module.get<CatalogService>(CatalogService);
    repository = module.get<CatalogRepository>(CatalogRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call repository.createAProduct with correct arguments', async () => {
      const userId = 1;
      const dto: CreateCatalogInput = {
        name: 'Test Product',
        description: 'Test Description',
        price: 100,
      };

      const catalog = {
        id: 1,
        name: dto.name,
        description: dto.description,
        price: dto.price,
        ownerId: userId,
        orderId: 1,
        cartId: 1,
      };

      jest.spyOn(repository, 'createAProduct').mockResolvedValue(catalog);

      const result = await service.create(userId, dto);

      expect(repository.createAProduct).toHaveBeenCalledWith(userId, dto);
      expect(result).toEqual(catalog);
    });
  });

  describe('remove', () => {
    it('should call repository.deleteAProduct with correct arguments', async () => {
      const id = 1;

      const deletedProduct = {
        id: id,
        name: 'Test Product',
        description: 'Test Description',
        price: 100,
        ownerId: 1,
        orderId: 1,
        cartId: 1,
      };

      jest
        .spyOn(repository, 'deleteAProduct')
        .mockResolvedValue(deletedProduct);

      return service.remove(id).then(() => {
        expect(repository.deleteAProduct).toHaveBeenCalledWith(id);
      });
    });
  });
});
