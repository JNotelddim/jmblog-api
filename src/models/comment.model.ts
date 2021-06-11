import { Schema, model } from 'mongoose';

export interface Comment {
  authorId: string;
  createdAt: Date;
  modifiedAt: Date;
  text: string;
}

const commentSchema = new Schema<Comment>({
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

const comment = model<Comment>('Comment', commentSchema);
export default comment;
