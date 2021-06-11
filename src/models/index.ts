import { connect } from 'mongoose';

import User from './user.model';
import Session from './session.model';
import Post from './post.model';
import Comment from './comment.model';

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

export const models = { User, Session, Post, Comment };
