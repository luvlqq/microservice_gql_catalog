import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { AtGuard } from '@app/common/modules/auth/guards';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLDataSource } from './gql-data-source';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.register({}),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        cors: {
          origin: '*',
          credentials: true,
        },
        context: ({ req, res }) => ({ req, res }),
      },
      gateway: {
        buildService: (args) => new GraphQLDataSource(args),
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            {
              name: 'cart',
              url: 'http://localhost:3003/graphql',
            },
            {
              name: 'catalog',
              url: 'http://localhost:3004/graphql',
            },
            {
              name: 'orders',
              url: 'http://localhost:3005/graphql',
            },
            {
              name: 'auth',
              url: 'http://localhost:3002/graphql',
            },
          ],
        }),
      },
    }),
  ],
  providers: [
    AtGuard,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class GatewayModule {}
