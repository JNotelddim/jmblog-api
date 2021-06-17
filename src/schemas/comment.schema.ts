import { Schema } from 'mongoose';
import { Comment } from '../interfaces';

export const CommentSchema = new Schema<Comment>({
  author: {
    type: Schema.Types.ObjectId,
    unique: false,
    required: true,
  },
  post: {
    type: Schema.Types.ObjectId,
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
  contents: {
    type: String,
    unique: false,
    required: false,
  },
});
