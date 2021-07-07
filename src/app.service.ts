// Decorators
import { Injectable } from '@nestjs/common';

// Exports
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
