import { OnGatewayDisconnect, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Client } from 'socket.io';
import { UserSocketService } from '../services/user-socket/user-socket.service';
import { RoomService } from '../services/room/room.service';

@WebSocketGateway()
export class UserGateway implements OnGatewayDisconnect {
  constructor(private socketService: UserSocketService, private roomService: RoomService) {
  }

  @SubscribeMessage('newUserSession')
  async handleMessage(client: Client, userID: any) {
    await this.socketService.addSession(userID, client.id).then(async () => {
      await this.roomService.createRoom({ user: client.id, name: userID });
      client['join']('melo');
    });
  }

  @SubscribeMessage('closeUserSession')
  async closeSession(client: Client) {
    await this.socketService.deleteSession(client.id);
    await this.roomService.deleteRoom(client.id);
  }

  async handleDisconnect(client: Client) {
    await this.socketService.deleteSession(client.id);
    await this.roomService.deleteRoom(client.id);
  }


}
