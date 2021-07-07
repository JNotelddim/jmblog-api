import { Schema } from 'mongoose';
import { User } from 'src/interfaces/user.interface';

export const UserSchema = new Schema<User>({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  salt: {
    type: String,
    unique: false,
    required: true,
  },
  hash: {
    type: String,
    unique: false,
    required: true,
  },
  iterations: {
    type: Number,
    unique: false,
    required: true,
  },

  // should these be type: Schema.Types.Array?
  posts: [
    {
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'Post',
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'Comment',
    },
  ],
  sessions: [
    {
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'Session',
    },
  ],
});
