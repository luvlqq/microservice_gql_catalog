import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '@app/db';
import { RmqModule } from '@app/common/modules/rabbitmq/rabbitmq.module';
import { ConfigModule } from '@nestjs/config';
import { OrdersRepository } from './orders.repository';
import { OrdersController } from './orders.controller';
import { AtGuard } from '@app/common/modules/auth/guards';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    JwtModule.register({}),
    PrismaModule,
    RmqModule.register({ name: 'ORDER' }),
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
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
  controllers: [OrdersController],
  providers: [
    OrdersResolver,
    OrdersService,
    OrdersRepository,
    AtGuard,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
  exports: [RmqModule],
})
export class OrdersModule {}
