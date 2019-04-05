import { Schema } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

const categories = {
  values: [
    'televisor',
    'video juegos',
    'computador',
    'estufa',
    'horno',
    'lavadora',
    'aire acondicionado',
    'ventilador',
    'microondas',
    'secador de pelo',
    'lámpara',
    'otro',
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
  category: { type: String, default: 'otro', enum: categories, lowercase: true },
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
