import { Module } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CatalogResolver } from './catalog.resolver';

@Module({
  providers: [CatalogResolver, CatalogService],
})
export class CatalogModule {}
