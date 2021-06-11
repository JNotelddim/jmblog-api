import { Module } from '@nestjs/common';

// Controllers
import { AppController } from './app.controller';
import { UserController } from './controllers';

// Services
import { AppService } from './app.service';
import { UserService } from './services';

// Exports
@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
