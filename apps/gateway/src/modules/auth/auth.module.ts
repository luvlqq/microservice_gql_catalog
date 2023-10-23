import { Module } from '@nestjs/common';
import { AuthGatewayService } from './auth.service';
import { AuthGatewayResolver } from './auth.resolver';

@Module({
  imports: [],
  providers: [AuthGatewayResolver, AuthGatewayService],
  exports: [],
})
export class AuthGatewayModule {}
