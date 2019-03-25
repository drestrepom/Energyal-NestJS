import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserSocketService {
  // @ts-ignore
  constructor(@InjectModel('SocketUser') private socketUserModel: Model) {
  }

  addSession(user: string, idSession: string) {
    const newSession = new this.socketUserModel({ sessionId: idSession, user });
    newSession.save();
  }

  deleteSession(idSession: string) {
    this.socketUserModel.findOneAndDelete({ sessionId: idSession })
      .exec((err, res) => {
        console.log(res);
      });
  }
}
