export interface IMeasurment {
  meter: string;
  irms: number;
  kwh: number;
  power?: number;
  value: number;
  startTime: Date;
  endTime: Date;
  interval: number;
}
