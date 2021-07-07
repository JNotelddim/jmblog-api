import { Connection } from 'mongoose';
import { UserSchema } from 'src/schemas/user.schema';
import { USER_MODEL, DATABASE_CONNECTION_KEY } from 'src/constants';

export const usersProviders = [
  {
    provide: USER_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema),
    inject: [DATABASE_CONNECTION_KEY],
  },
];
