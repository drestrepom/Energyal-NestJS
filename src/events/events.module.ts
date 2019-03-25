import { Module } from '@nestjs/common';
import { PruebaGateway } from '../gateways/prueba.gateway';
import { UserSocketService } from '../services/user-socket/user-socket.service';

@Module({
  providers: [ PruebaGateway],
})
export class EventsModule {}
