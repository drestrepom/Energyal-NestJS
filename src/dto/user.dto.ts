import { IDocument } from './IDocument';

export class UserDto implements IDocument {
  _id: string;
  name: string;
  email: string;
  password: string;
  city: string;
  electrodomestics: Array<{ electrodomestics: string, role: string }>;
  status: boolean;

}
