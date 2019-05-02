import { ElectrodomesticSchema } from './electrodomestic.schema';
import { UserSchema } from './user.schema';
import { MeterSchema } from './meter.schema';
import { SocketUserSchema } from './socketUser.schema';
import { MeasurementSchema } from './measurment.schema';
import { RoomSchema } from './room.model';

export const MODELS = [
  { name: 'User', schema: UserSchema },
  { name: 'Electrodomestic', schema: ElectrodomesticSchema },
  { name: 'Meter', schema: MeterSchema },
  { name: 'SocketUser', schema: SocketUserSchema },
  { name: 'Measurement', schema: MeasurementSchema },
  { name: 'Room', schema: RoomSchema },
];
