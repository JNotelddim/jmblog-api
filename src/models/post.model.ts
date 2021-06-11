import { Schema, model } from 'mongoose';

export interface Post {
  authorId: string;
  contents: string;
  createdAt: Date;
  modifiedAt: Date;
  title: string;
}

const postSchema = new Schema<Post>({
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

const post = model<Post>('Post', postSchema);
export default post;
