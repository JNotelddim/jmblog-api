import { config } from 'dotenv';
// Load in .env vars:
config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connectDb } from './models';

// Establish app fn
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Connect to database.
  connectDb().then(async () => {
    await app.listen(process.env.RUNNING_PORT, () => {
      console.log(`Blog Api listening on port ${process.env.RUNNING_PORT}`);
    });
  });
}
// Start running app
bootstrap();
