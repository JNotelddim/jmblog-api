import { Connection } from 'mongoose';
import { UserSchema } from '../schemas';
import { USER_MODEL, DATABASE_CONNECTION_KEY } from '../constants';

export const usersProviders = [
  {
    provide: USER_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema),
    inject: [DATABASE_CONNECTION_KEY],
  },
];
