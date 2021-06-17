import { Module } from '@nestjs/common';

// Controllers
import { AppController } from 'src/controllers';

// Services
import { AppService } from 'src/services';

// Modules
import { UsersModule } from 'src/modules';

// Exports
@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
