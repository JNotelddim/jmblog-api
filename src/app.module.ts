import { Module } from '@nestjs/common';

// Controllers
import { AppController } from 'src/app.controller';

// Services
import { AppService } from 'src/app.service';

// Modules
import { AuthModule } from 'src/auth/auth.module';

// Exports
@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
