import { Connection } from 'mongoose';
import { COMMENT_MODEL, DATABASE_CONNECTION_KEY } from 'src/constants';
import { CommentSchema } from 'src/schemas/comment.schema';

export const commentsProviders = [
  {
    provide: COMMENT_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Comment', CommentSchema),
    inject: [DATABASE_CONNECTION_KEY],
  },
];
