import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [],
  providers: [],
  exports: [UsersModule, RolesModule],
  imports: [UsersModule, RolesModule, AuthModule],
})
export class FeaturesModule {}
