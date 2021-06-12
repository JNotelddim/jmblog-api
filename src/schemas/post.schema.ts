import { Schema } from 'mongoose';
import { Post } from '../interfaces';

export const PostSchema = new Schema<Post>({
  author: {
    type: Schema.Types.ObjectId,
    unique: false,
    required: true,
  },
  title: {
    type: String,
    unique: false,
    required: true,
  },
  createdAt: {
    type: Date,
    unique: false,
    required: true,
  },
  modifiedAt: {
    type: Date,
    unique: false,
    required: true,
  },
  content: {
    type: String,
    unique: false,
    required: false,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'Comment',
    },
  ],
});
