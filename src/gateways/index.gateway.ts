import { MeasurementGateway } from './measurement.gateway';
import { RoomsGateway } from './rooms.gateway';
import { UserGateway } from './user.gateway';
import { MeterGateway } from './meter.gateway';

export const GATEWAYS = [
    RoomsGateway,
    UserGateway,
    MeterGateway,
    MeasurementGateway,
  ]
;
