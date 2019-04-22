import { IDocument } from './IDocument';

export class MeasurmentDto implements IDocument {
  _id: string;
  meter: string;
  irms: number;
  kwh: number;
  value: number;
  startTime: Date;
  endTime: Date;
  status: boolean;
}
