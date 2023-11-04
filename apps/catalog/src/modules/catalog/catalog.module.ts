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
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { CreateCatalogHandler } from './handlers/commands/create';
import { GetAllCatalogsHandler } from './handlers/queries/findAll';
import { CqrsModule } from '@nestjs/cqrs';
import { UpdateCatalogHandler } from './handlers/commands/update';
import { RemoveCatalogHandler } from './handlers/commands/delete';
import { GetCatalogByIdHandler } from './handlers/queries/findOne';
import { MongodbModule } from '../mongodb/mongodb.module';

const CommandHandlers = [
  CreateCatalogHandler,
  UpdateCatalogHandler,
  RemoveCatalogHandler,
];
const QueryHandlers = [GetAllCatalogsHandler, GetCatalogByIdHandler];

@Module({
  imports: [
    PrismaModule,
    CqrsModule,
    MongodbModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
  ],
  providers: [
    CatalogResolver,
    CatalogService,
    CatalogRepository,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class CatalogModule {}
