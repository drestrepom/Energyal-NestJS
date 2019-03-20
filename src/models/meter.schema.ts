import { Schema } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

const models = {
  values: ['ACS712ELCTR-05B-T', 'ACS712ELCTR-20A-T', 'ACS712ELCTR-30A-T'],
  message: '{VALUE} no se encuentra en nuestro sistema',
};
export const MeterSchema = new Schema({
  serial: {type: String, required: [true, 'El serial es requerido'], unique: true},
  electrodomestic: {type: Schema.Types.ObjectId, ref: 'Electrodomestic', unique: true, required: false},
  model: {type: String, enum: models, required: true},
  status: {type: Boolean, default: true},
});

// MeterSchema.plugin(uniqueValidator,  {message : '{PATH} debe de ser unico'});
