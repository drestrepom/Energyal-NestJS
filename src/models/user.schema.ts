import { Document, Schema, Model, model } from 'mongoose';
import { IUser } from '../interfaces/user.interface';
import * as uniqueValidator from 'mongoose-unique-validator';

const ciudades = {
  values: ['Medellín', 'Cali', 'Bogota', 'Yarumal', 'Santa Rosa', 'La Ceja', 'Río Negro'],
  message: '{VALUE} aun no esta en nuestro sistema',
};
const roles = {
  values: ['ADMIN', 'USER', 'OWNER'],
  message: '{VALUE} no es un rol valido',
};

export const UserSchema: Schema = new Schema({
  name: { type: String, required: [true, 'El nombre es requerido'] },
  email: { unique: true, type: String, required: [true, 'El correo es necesario'] },
  password: { type: String, required: true },
  city: { type: String, default: 'Medellín', enum: ciudades, required: false },
  electrodomestics: {
    type: [{
      electrodomestic: { type: Schema.Types.ObjectId, ref: 'Electrodomestic' },
      role: { type: String, enum: roles, default: 'OWNER' },
    }],
    required: false,
  },
  status: { type: Boolean, default: true },
});
UserSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();
  delete user.electrodomestics;
  delete userObject.contrasena;
  return userObject;
};
UserSchema.plugin(uniqueValidator, {message: '{PATH} debe de ser unico'});

// @ts-ignore
// export const UserSchema: Model<IUser> = model<IUser>('User', userSchema);
