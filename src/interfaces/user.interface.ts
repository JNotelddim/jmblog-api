import { Document } from 'mongoose';

export interface User extends Document {
  readonly email: string;
  readonly createdAt: Date;
  readonly salt: string;
  readonly hash: string;
  readonly iterations: number;
}
