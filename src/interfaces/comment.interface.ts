import { Document } from 'mongoose';
export interface Comment extends Document {
  readonly authorId: string;
  readonly createdAt: Date;
  readonly modifiedAt: Date;
  readonly text: string;
}
