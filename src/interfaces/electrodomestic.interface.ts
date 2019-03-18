import { IUser } from './user.interface';

export interface IElectrodomestic {
  _id?: string;
  serial: string;
  name: string;
  category?: string;
  voltage: number;
  meter: string;
  users?: [{user: String, rol?: string}];
  status?: boolean;
}
