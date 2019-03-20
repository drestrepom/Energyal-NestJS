import { Schema } from 'mongoose';

export const MeasurementSchema = new Schema({
  meter: { type: Schema.Types.ObjectId, ref: 'Meter', required: true, unique: false },
  irms: { type: Number, required: true },
  power: { type: Number, required: false },
  value: { type: Number, required: false },
  startTime: Date,
  endTime: Date,
});
