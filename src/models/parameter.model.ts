import { Schema } from 'mongoose';

export const scales = {
  values: ['DAY', 'MONTH', 'WEEK'],
  message: '{VALUE} no es una escala valida',
};
export const ParameterSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: false },
  parameters: {
    day: {
      money: { type: Number, default: 0 },
      kwh: { type: Number, default: 0 },
    },
    month: {
      money: { type: Number, default: 0 },
      kwh: { type: Number, default: 0 },
    },
    week: {
      money: { type: Number, default: 0 },
      kwh: { type: Number, default: 0 },
    },
  },
});
