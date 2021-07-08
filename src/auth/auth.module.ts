import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

// Controllers
import { AuthController } from 'src/auth/auth.controller';

// Services
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';

// Modules
import { UsersModule } from 'src/users/users.module';
import { DatabaseModule } from 'src/database/database.module';

// Strategies
import { LocalStrategy } from 'src/passport/local.strategy';
import { JwtStrategy } from 'src/passport/jwt.strategy';

// Providers
import { usersProviders } from 'src/users/users.providers';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '10h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    LocalStrategy,
    JwtStrategy,
    ...usersProviders,
  ],
})
export class AuthModule {}
