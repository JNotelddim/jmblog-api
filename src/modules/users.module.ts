import { Module } from '@nestjs/common';
import { UsersController } from '../controllers';
import { UsersService } from '../services';
import { usersProviders } from '../providers';
import { DatabaseModule } from '.';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
})
export class UsersModule {}
