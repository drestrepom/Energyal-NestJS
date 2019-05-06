import { IDocument } from './IDocument';

export class ParameterDto implements IDocument {
  user: string;
  _id: string;
  kwh: number;
  money: number;
  scale: string;
}
