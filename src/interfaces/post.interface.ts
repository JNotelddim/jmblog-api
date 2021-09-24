import { Document } from 'mongoose';

export interface Post extends Document {
  readonly authorId: string;
  readonly content: string;
  readonly summary: string;
  readonly createdAt: Date;
  readonly modifiedAt: Date;
  readonly title: string;
}

export interface SummarizedPost {
  authorId: string;
  title: string;
  createdAt: Date;
  summary: string;
}
