import { Module } from '@nestjs/common';
import { CatalogModule } from './modules/catalog/catalog.module';

@Module({
  imports: [CatalogModule],
})
export class CatalogMicroserviceModule {}
