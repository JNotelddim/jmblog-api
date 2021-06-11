import { Schema, model } from 'mongoose';

interface Session {
  authorId: string;
  createdAt: Date;
  modifiedAt: Date;
  text: string;
}

const sessionSchema = new Schema<Session>({
  user: {
    type: Schema.Types.ObjectId,
    unique: false,
    required: true,
  },
  expiration: {
    type: Date,
    unique: false,
    required: true,
  },
});

const session = model('Session', sessionSchema);
export default session;
