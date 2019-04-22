import { IDocument } from './IDocument';

export class ElectrodomesticDto implements IDocument {
  _id: string;
  serial: string;
  name: string;
  category: string;
  voltage: string;
  meter: string;
  users: string[];
  status: boolean;

}

enum roles {
  'ADMIN',
  'USER',
}
