import { IDocument } from './IDocument';

/**
 * Clase para representar una medición
 */
export class MeasurmentDto implements IDocument {
  _id: string;

  status: boolean;

  /** Medidor que realizo la medición */
  meter: string;

  /** Corriente efectiva de la medición */
  irms: number;
  /** kwh consumidos en la medición */
  kwh: number;

  /** Costo monetario de la medición */
  value: number;

  /** Fecha y hora en la que se comenzó la medición */
  startTime: Date;

  /** Fecha y hora en la que se comenzó la medición */
  endTime: Date;
}
