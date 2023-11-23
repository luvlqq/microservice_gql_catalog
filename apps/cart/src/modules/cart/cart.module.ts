import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartResolver } from './cart.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { PrismaModule } from '@app/db';
import { AtGuard } from '@app/common/modules/auth/guards';
import { APP_GUARD } from '@nestjs/core';
import { CartRepository } from './cart.repository';
import { JwtModule } from '@nestjs/jwt';
import { RmqModule } from '@app/common/modules/rabbitmq/rabbitmq.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({}),
    RmqModule.register({ name: 'ORDER' }),
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
  ],
  providers: [
    CartResolver,
    CartService,
    CartRepository,
    AtGuard,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
  exports: [RmqModule],
})
export class CartModule {}
