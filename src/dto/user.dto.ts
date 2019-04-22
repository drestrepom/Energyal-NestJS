import { IDocument } from './IDocument';

export class UserDto implements IDocument {
  _id: string;
  name;
  email;
  password;
  city;
  electrodomestics: Array<{ electrodomestics: string, role: string }>;
  status: boolean;

}
