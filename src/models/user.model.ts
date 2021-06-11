import { Schema, model } from 'mongoose';

interface User {
  email: string;
  createdAt: Date;
  salt: string;
  hash: string;
  iterations: number;
}

const userSchema = new Schema<User>({
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

const user = model('User', userSchema);
export default user;
