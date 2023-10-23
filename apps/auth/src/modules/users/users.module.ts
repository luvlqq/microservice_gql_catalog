import { Module } from '@nestjs/common';
import { UsersMicroserviceResolver } from './users.resolver';
import { UsersMicroserviceService } from './users.service';

@Module({
  imports: [],
  providers: [UsersMicroserviceResolver, UsersMicroserviceService],
  exports: [],
})
export class UsersMicroserviceModule {}
