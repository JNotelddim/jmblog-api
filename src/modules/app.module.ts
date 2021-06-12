import { Module } from '@nestjs/common';

// Controllers
import { AppController } from '../app.controller';
import { UsersController } from '../controllers';

// Services
import { AppService } from '../app.service';
import { UsersService } from '../services';

// Modules
import { UsersModule } from './users.module';

// Exports
@Module({
  imports: [UsersModule],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
