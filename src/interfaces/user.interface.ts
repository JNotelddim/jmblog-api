import { Document } from 'mongoose';

export interface User extends Document {
  readonly email: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly userName?: string;
  readonly createdAt: Date;
  readonly salt: string;
  readonly hash: string;
  readonly iterations: number;
}

export interface UserProfile {
  id: string;
  email: string;
  createdAt: Date;
  firstName?: string;
  lastName?: string;
  userName?: string;
}
