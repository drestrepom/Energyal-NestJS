import { Schema } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

export const SocketUserSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', unique: true, required: false },
  sessionId: { type: String, unique: true, required: false },
});
