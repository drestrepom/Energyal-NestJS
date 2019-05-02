import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoomDto } from '../../dto/room.dto';
import { Room } from 'socket.io';

@Injectable()
export class RoomService {

  // @ts-ignore
  constructor(@InjectModel('Room') private roomModel: Model) {
  }

  async createRoom(room: RoomDto) {
    await new this.roomModel(room).save();
  }

  async deleteRoom(userId) {
    return await this.roomModel.deleteOne({ user: userId });
  }
}
