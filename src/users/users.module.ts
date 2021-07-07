import { forwardRef, Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';
import { usersProviders } from 'src/users/users.providers';

@Module({
  // TODO: remove forwardRef?
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
})
export class UsersModule {}
