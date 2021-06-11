// Decorators
import { Injectable } from '@nestjs/common';

// Models

// Exports
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getUsers(): string {
    return 'test get users';
  }
}
