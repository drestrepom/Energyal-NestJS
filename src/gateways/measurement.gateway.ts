import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Client, Server } from 'socket.io';
import { UserSocketService } from '../services/user-socket/user-socket.service';
import { UserService } from '../services/user/user.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@WebSocketGateway()
export class MeasurementGateway implements OnGatewayConnection, OnGatewayDisconnect {
  // @ts-ignore

  constructor(private socketService: UserSocketService) {

  }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  handleConnection(client: Client, ...args: any[]): any {

    console.log(`Se conecto el cliente ${client.id} ${args}`);
  }

  handleDisconnect(client: Client): any {
    this.socketService.deleteSession(client.id);
    console.log(`Se desconecto el cliente ${client.id}`);
  }

  @SubscribeMessage('newSession')
  newSession(client: Client, userID: any) {
    this.socketService.addSession(userID, client.id);
    console.log('user', userID);
  }

  @SubscribeMessage('closeSession')
  closeSession(client: Client) {
    this.socketService.deleteSession(client.id);
  }

  @SubscribeMessage('greeting')
  greeting(client: Client, data) {
    console.log(`El cliente ${client.id} mando ${data}`);
  }
  @SubscribeMessage('')
  jiji(client: Client, data) {
    console.log(`El cliente ${client.id} mando ${data}`);
  }

  sendMeasuremest(measurement) {
    // console.log(measurement);
    this.server.emit('measurement', measurement);
  }
}
