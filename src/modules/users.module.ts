import { forwardRef, Module } from '@nestjs/common';

import { DatabaseModule } from 'src/modules';
import { UsersController } from 'src/controllers';
import { UsersService } from 'src/services';
import { usersProviders } from 'src/providers';

@Module({
  imports: [forwardRef(() => DatabaseModule)],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
})
export class UsersModule {}
