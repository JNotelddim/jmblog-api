import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from 'src/controllers';
import { AuthService, UsersService } from 'src/services';
import { UsersModule } from 'src/modules';
import { LocalStrategy } from 'src/passport/strategies';

@Module({
  imports: [UsersModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService, LocalStrategy],
})
export class AuthModule {}
