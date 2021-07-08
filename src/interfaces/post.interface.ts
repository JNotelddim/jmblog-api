import { Document } from 'mongoose';

export interface Post extends Document {
  readonly authorId: string;
  readonly contents: string;
  readonly createdAt: Date;
  readonly modifiedAt: Date;
  readonly title: string;
}
