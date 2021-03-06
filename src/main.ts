import { config } from 'dotenv';
// Load in .env vars:
config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Establish app fn
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT || 8080, () => {
    console.log(`Blog Api listening on port ${process.env.PORT || 8080}`);
  });
}

// Start running app
bootstrap();
