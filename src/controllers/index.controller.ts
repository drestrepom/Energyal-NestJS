import { ElectrodomesticController } from './electrodomestic/electrodomestic.controller';
import { MeasurementController } from './measurment/measurementController';
import { MeterController } from './meter/meter.controller';
import { StatsController } from './stats/stats.controller';
import { UserController } from './user/user.controller';
import { AppController } from '../app.controller';

export const CONTROLLERS = [
  ElectrodomesticController,
  MeasurementController,
  MeterController,
  StatsController,
  UserController,
  AppController,
];
