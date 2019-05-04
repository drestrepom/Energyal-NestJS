import { ElectrodomesticService } from './electrodomestic/electrodomestic.service';
import { MeasurementService } from './measurment/measurement.service';
import { MeterService } from './meter/meter.service';
import { RoomService } from './room/room.service';
import { StatsService } from './stats/stats.service';
import { UserService } from './user/user.service';
import { UserSocketService } from './user-socket/user-socket.service';
import { AppService } from '../app.service';
import { RoomsGateway } from '../gateways/rooms.gateway';
import { UserGateway } from '../gateways/user.gateway';
import { MeterGateway } from '../gateways/meter.gateway';
import { MeasurementGateway } from '../gateways/measurement.gateway';

export const SERVICES = [
  MeasurementService,
  ElectrodomesticService,
  MeterService,
  RoomService,
  StatsService,
  UserService,
  UserSocketService,
  AppService,
  RoomsGateway,
  UserGateway,
  MeterGateway,
  MeasurementGateway,
];
