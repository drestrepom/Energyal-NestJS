import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RoomService } from '../room/room.service';
import { Room } from 'socket.io';

@Injectable()
export class UserSocketService {
  // @ts-ignore
  constructor(@InjectModel('SocketUser') private socketUserModel: Model, private roomService: RoomService) {
  }

  async addSession(user: string, idSession: string) {
    const newSession = await new this.socketUserModel({ sessionId: idSession, user });
    newSession.save(async (err, res) => {
      await this.roomService.createRoom({ user, name: user });
    });
  }

  async deleteSession(idSession: string) {
    await this.socketUserModel.findOneAndDelete({ sessionId: idSession })
      .exec();
  }
}
