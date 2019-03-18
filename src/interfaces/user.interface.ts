import { IElectrodomestic } from './electrodomestic.interface';

export enum Citys {
  Medellín = 'Medellín',
  Cali = 'Cali',
  Bogota= 'Bogota',
  Yarumal = 'Yarumal',
  SantaRosa = 'Santa Rosa',
  LaCeja = 'La Ceja',
  RíoNegro = 'Río Negro',
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  city?: string;
  electrodomestics?: [IElectrodomestic];
  status?: boolean;
}
