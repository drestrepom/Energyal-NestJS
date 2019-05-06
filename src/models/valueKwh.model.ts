import { Schema } from 'mongoose';

export const ValueKwhSchema = new Schema({
  stratum: { type: Number },
  value: { type: Number },
});
