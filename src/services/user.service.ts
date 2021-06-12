// Decorators
import { Injectable } from '@nestjs/common';

// Models
import { User, UserModel } from '../models';

// Exports
@Injectable()
export class UserService {
  async getUsers(): Promise<string> {
    const result = await UserModel.find((err, docs) => {
      if (err) {
        return console.error(err);
      }
      return docs;
    });
    return `Total users: ${result.length}`;
  }

  // exmaple id: 507f1f77bcf86cd799439011
  async getUser(id: string): Promise<User> {
    const result = await UserModel.findById(id, (err, doc) => {
      if (err) {
        // TODO: customize error handling
        return console.error(err);
      }
      if (!doc) {
        // TODO handle: 404
        return 'Not found';
      }
      // TODO: test once you've got an exmaple user in the db
      return doc.toObject();
    });
    return result;
  }
}
