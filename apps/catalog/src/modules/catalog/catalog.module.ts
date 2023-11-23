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
import { AtGuard } from '@app/common/modules/auth/guards';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { MyLoggerModule } from '@app/common/modules/winston/winston.module';
import { RoleGuard } from '@app/common/modules/auth/guards/roles.guard';

const CommandHandlers = [
  CreateCatalogHandler,
  UpdateCatalogHandler,
  RemoveCatalogHandler,
];
const QueryHandlers = [GetAllCatalogsHandler, GetCatalogByIdHandler];

@Module({
  imports: [
    JwtModule.register({}),
    PrismaModule,
    CqrsModule,
    MongodbModule,
    MyLoggerModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
      cors: {
        credentials: true,
        origin: '*',
      },
      context: ({ req, res }) => ({ req, res }),
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
    RoleGuard,
    AtGuard,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class CatalogModule {}
