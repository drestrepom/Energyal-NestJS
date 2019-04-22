import { IDocument } from './IDocument';

export class MeterDto implements IDocument {
  _id: string;
  serial: string;
  electrodomestic: string;
  model: models;
  status: boolean;
}

enum models {
  'ACS712ELCTR-05B-T', 'ACS712ELCTR-20A-T', 'ACS712ELCTR-30A-T',
}
