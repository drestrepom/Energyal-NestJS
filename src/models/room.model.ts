import { Schema } from 'mongoose';

export const RoomSchema = new Schema({
  user: { type: String, unique: true, required: false }, // codigo de seccion del usuario
  name: { type: String, required: true }, // id mongo del usuario
});
