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
    return await newMeter.save()
      .catch(reason => {
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

  async getOne(serial?: string, id?: string) {
    if (serial) {
      return await this.meterModel.findOne({ serial }, async (err, res) => {
        CustomException.getExecptio(err, res, `No se ha encontardo el medidor con el Serial ${serial}`);
        return res;
      }).populate('electrodomestic', 'voltage');
    }
    if (id) {
      return await this.meterModel.findOne({ _id: id }, async (err, res) => {
        CustomException.getExecptio(err, res, `No se ha encontardo el medidor con el _id ${serial}`);
        return res;
        console.log(res);
      }).populate('electrodomestic', 'voltage');
    }
  }

  async setElectrodomestic(idELctro, idMetre) {
    const meter: IMeter = await this.getOne(null, idMetre);
    if (meter.electrodomestic) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'El dispositivo es propiedad de otro usuario',
      }, 400);
    }
    return await this.meterModel.findOneAndUpdate({ _id: idMetre }, { electrodomestic: idELctro })
      .exec((err, res) => {
        CustomException.updateExceptio(err, res);
        return res;
      });
  }
}
