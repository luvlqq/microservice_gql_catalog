import { Module } from '@nestjs/common';
import { CatalogModule } from './modules/catalog/catalog.module';
import { MongodbModule } from './modules/mongodb/mongodb.module';

@Module({
  imports: [CatalogModule, MongodbModule],
})
export class CatalogMicroserviceModule {}
