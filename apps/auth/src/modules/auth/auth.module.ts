import { Module } from '@nestjs/common';
import { AuthMicroserviceService } from './auth.service';
import { AuthMicroserviceResolver } from './auth.resolver';
import { UsersMicroserviceModule } from '../users/users.module';

@Module({
  imports: [UsersMicroserviceModule],
  providers: [AuthMicroserviceService, AuthMicroserviceResolver],
})
export class AuthMicroserviceModule {}
