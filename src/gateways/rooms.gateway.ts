import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Client } from 'socket.io';
import { UserSocketService } from '../services/user-socket/user-socket.service';

@WebSocketGateway()
export class RoomsGateway {
  constructor(private socketService: UserSocketService) {
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  @SubscribeMessage('newSessionMeter')
  newSessionMeter(client: Client, payload: any) {

  }
}
