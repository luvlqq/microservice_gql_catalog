import { Module } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CatalogResolver } from './catalog.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { CatalogRepository } from './catalog.repository';
import { PrismaModule } from '@app/db';

@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
  ],
  providers: [CatalogResolver, CatalogService, CatalogRepository],
})
export class CatalogModule {}
