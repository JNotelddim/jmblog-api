import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from 'src/services/auth.service';
import { UsersModule } from 'src/modules/users.module';
import { LocalStrategy } from 'src/strategies/local.strategy';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
