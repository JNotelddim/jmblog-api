import { connect } from 'mongoose';

const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const host = process.env.DB_HOST;

export const connectDb = () =>
  connect(
    `mongodb+srv://${username}:${password}@${host}/myFirstDatabase?retryWrites=true&w=majority`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
  );

export { default as UserModel, User } from './user.model';
export { default as SessionModel, Session } from './session.model';
export { default as PostModel, Post } from './post.model';
export { default as CommentModel, Comment } from './comment.model';
