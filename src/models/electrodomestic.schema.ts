import { Schema } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

export const categories = {
  values: [
    'Cocina',
    'Baño',
    'Patio',
    'Hogar',
    'Otros',
  ],
  message: '{VALUE} aun no esta en nuestro sistema',
};
const userTypes = {
  values: ['ADMIN', 'USER'],
  message: '{VALUE} no es un rol valido',
};
export const ElectrodomesticSchema = new Schema({
  serial: { unique: true, type: String, required: [true, 'El serial del electrodoméstico es necesario'] },
  name: { type: String, required: [true, 'El nombre de usuario es necesario'], lowercase: true },
  category: { type: String, default: 'Otro', enum: categories, lowercase: true },
  voltage: { type: Number, required: [false, 'El voltaje de funcionamiento es necesario'] },
  meter: { type: Schema.Types.ObjectId, ref: 'Meter', required: true },
  users: {
    type: [{
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      role: { type: String, enum: userTypes, required: false, default: 'ADMIN' },
    }],
    required: false,
  },
  status: { type: Boolean, default: true },
});

ElectrodomesticSchema.plugin(uniqueValidator, { message: 'El {PATH} ha sido registrado por otro usuario.' });
