import * as mongoose from 'mongoose';

import { DATABASE_CONNECTION_KEY } from 'src/constants';

const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const host = process.env.DB_HOST;

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION_KEY,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        `mongodb+srv://${username}:${password}@${host}/myFirstDatabase?retryWrites=true&w=majority`,
        {
          useUnifiedTopology: true,
          useNewUrlParser: true,
        },
      ),
  },
];
