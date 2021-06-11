// Decorators
import { Injectable } from '@nestjs/common';

// Models
import { User, UserModel } from '../models';

// Exports
@Injectable()
export class UserService {
  // TODO: figure out how to make querying the db work.
  async getUsers(): Promise<string> {
    const result = await UserModel.find((err, docs) => {
      if (err) {
        return console.error(err);
      }
      return docs;
    });
    return `Total users: ${result.length}`;
  }
}
