import { Connection } from 'mongoose';
import { PostSchema } from 'src/schemas/post.schema';
import { POST_MODEL, DATABASE_CONNECTION_KEY } from 'src/constants';

export const postsProviders = [
  {
    provide: POST_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Post', PostSchema),
    inject: [DATABASE_CONNECTION_KEY],
  },
];
