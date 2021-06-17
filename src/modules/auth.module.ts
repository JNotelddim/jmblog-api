import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from 'src/controllers';
import { AuthService } from 'src/services/auth.service';
import { UsersModule } from 'src/modules/users.module';
import { LocalStrategy } from 'src/strategies/local.strategy';

@Module({
  imports: [UsersModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
