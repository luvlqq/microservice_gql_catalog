import { AtGuard } from '@app/common/modules/auth/guards';
import { AtStrategy, RtStrategy } from '@app/common/modules/auth/strategies';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  providers: [
    AtStrategy,
    RtStrategy,
    AtGuard,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AuthModule {}
