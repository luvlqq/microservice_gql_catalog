import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { AuthRepository } from './auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '@app/db';
import { JwtTokenService } from './jwt.tokens.service';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { AtStrategy, RtStrategy } from '@app/common/modules/auth/strategies';
import configuration from '@app/common/modules/auth/config/configuration';
import { MyLoggerModule } from '@app/common/modules/winston/winston.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    JwtModule.register({}),
    PrismaModule,
    MyLoggerModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
      context: ({ req, res }) => ({ req, res }),
      cors: {
        origin: '*',
        credentials: true,
      },
    }),
  ],
  providers: [
    AuthResolver,
    AuthService,
    AuthRepository,
    JwtTokenService,
    AtStrategy,
    RtStrategy,
  ],
})
export class AuthModule {}
