import { Module } from '@nestjs/common';

// Controllers
import { AppController } from '../app.controller';

// Services
import { AppService } from '../app.service';

// Modules
import { UsersModule } from './users.module';

// Exports
@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
