import { Module } from '@nestjs/common';

// Controllers
import { AppController } from 'src/controllers';

// Services
import { AppService } from 'src/services';

// Modules
import { AuthModule } from 'src/modules';

// Exports
@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
