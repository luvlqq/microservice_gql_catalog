import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AtGuard } from '@app/common/modules/auth/guards';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [JwtModule.register({}), AuthModule],
  providers: [
    AtGuard,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AuthMicroserviceModule {}
