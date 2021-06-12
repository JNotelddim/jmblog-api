import { Document } from 'mongoose';

export interface Session extends Document {
  readonly authorId: string;
  readonly createdAt: Date;
  readonly modifiedAt: Date;
  readonly text: string;
}
