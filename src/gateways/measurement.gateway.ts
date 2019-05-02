import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Client, Server } from 'socket.io';
import { UserSocketService } from '../services/user-socket/user-socket.service';
import { UserService } from '../services/user/user.service';
import { MeasurmentDto } from '../dto/measurment.dto';
import { MeasurementService } from '../services/measurment/measurement.service';

@WebSocketGateway()
export class MeasurementGateway implements OnGatewayConnection, OnGatewayDisconnect {
  // @ts-ignore
  kWhValue = process.env.kwhV;

  constructor( ) {
    console.log(this.kWhValue);
  }

  @WebSocketServer()
  server: Server;

  handleConnection(client: Client, ...args: any[]): any {
    console.log(`Se conecto el cliente ${client.id} ${args}`);
  }

  handleDisconnect(client: Client): any {
    // this.socketService.deleteSession(client.id);
    console.log(`Se desconecto el cliente ${client.id}`);
  }


  sendMeasurements(measurement) {
    // console.log(measurement)
    this.server.emit('measurement', measurement);
  }

  @SubscribeMessage('measurement')
  registerMeasurement(client: Client, measurement: MeasurmentDto) {

  }

}
