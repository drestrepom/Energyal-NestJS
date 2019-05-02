import { ElectrodomesticService } from './electrodomestic/electrodomestic.service';
import { MeasurementService } from './measurment/measurement.service';
import { MeterService } from './meter/meter.service';
import { RoomService } from './room/room.service';
import { StatsService } from './stats/stats.service';
import { UserService } from './user/user.service';
import { UserSocketService } from './user-socket/user-socket.service';
import { AppService } from '../app.service';

export const SERVICES = [
  ElectrodomesticService,
  MeasurementService,
  MeterService,
  RoomService,
  StatsService,
  UserService,
  UserSocketService,
  AppService,
];
