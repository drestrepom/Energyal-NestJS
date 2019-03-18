import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IMeter } from '../../interfaces/meter.interface';
import { IUser } from '../../interfaces/user.interface';
import { CustomException } from '../../utils/custom-exception';

@Injectable()
export class MeterService {
  // @ts-ignore
  constructor(@InjectModel('Meter') private meterModel: Model) {
  }

  async register(meter: IMeter): Promise<IMeter> {
    const newMeter = new this.meterModel(meter);
    return await newMeter.save().catch(reason => {
      if (reason.name) {
        throw new HttpException({
          status: HttpStatus.FORBIDDEN,
          error: reason,
        }, 403);
      }
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: reason,
      }, 500);
    });
  }

  async getOne(serial: string) {
    return await this.meterModel.findOne({ serial }, (err, res) => {
      new CustomException().getExecptio(err, res, `No se ha encontardo el medidor con el serial ${serial}`);
      return res;
    }).populate('electrodomestic', 'voltage');
  }
}
