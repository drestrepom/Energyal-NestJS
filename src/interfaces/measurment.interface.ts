export interface IMeasurment {
  meter: string;
  irms: number;
  kwh: number;
  value: number;
  startTime: Date;
  endTime: Date;
  interval?: number;
}
