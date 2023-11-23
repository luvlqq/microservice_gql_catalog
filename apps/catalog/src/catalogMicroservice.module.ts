import { Module } from '@nestjs/common';
import { CatalogModule } from './modules/catalog/catalog.module';
import { MongodbModule } from './modules/mongodb/mongodb.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [CatalogModule, MongodbModule, AuthModule],
})
export class CatalogMicroserviceModule {}
