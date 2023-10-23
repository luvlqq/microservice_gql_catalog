import { Module } from '@nestjs/common';
import { CatalogGatewayResolver } from './catalog.resolver';
import { CatalogGatewayService } from './catalog.service';

@Module({
  imports: [],
  providers: [CatalogGatewayResolver, CatalogGatewayService],
  exports: [],
})
export class CatalogGatewayModule {}
