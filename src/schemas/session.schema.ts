import { Schema } from 'mongoose';
import { Session } from 'src/interfaces/session.interface';

export const SessionSchema = new Schema<Session>({
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
