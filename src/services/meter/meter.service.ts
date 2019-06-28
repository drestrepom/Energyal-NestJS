import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CustomException } from '../../utils/custom-exception';
import { MeterDto } from './../../dto/meter.dto';

@Injectable()
export class MeterService {
  // @ts-ignore
  constructor(@InjectModel('Meter') private meterModel: Model) {
  }

  async register(meter: MeterDto): Promise<MeterDto> {
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

  async getOne(serial?: string, id?: string): Promise<any> {
    let result;
    let exception: HttpException;
    if (serial) {
      await this.meterModel.findOne({ serial }, (err, res) => {
        if (!res) {
          exception = CustomException.noResults(`No se ha encontrado el medidor con el serial ${serial}`);
        } else if (err) {
          exception = CustomException.internalError(err);
        }
        result = res;
      }).populate('electrodomestic', 'users voltage');
    }
    if (id) {
      return await this.meterModel.findById(id, async (err, res) => {
        if (!res) {
          exception = CustomException.noResults(`No se ha encontrado el medidor con el serial ${serial}`);
        } else if (err) {
          exception = CustomException.internalError(err);
        }
        result = res;
      }).populate('electrodomestic', 'voltage');
    }
    return result == null ? Promise.reject(exception) : Promise.resolve(result);
  }

  async setElectrodomestic(idELctro, idMetre) {
    const meter: MeterDto = await this.getOne(null, idMetre);
    if (meter.electrodomestic) {
      throw  CustomException.clientError('El dispositivo es propiedad de otro usuario');
    }
    return await this.meterModel.findOneAndUpdate({ _id: idMetre }, { electrodomestic: idELctro })
      .exec((err, res) => {
        CustomException.updateExceptio(err, res);
        return res;
      });
  }

  async owner(idMetre) {
    const meter: MeterDto = await this.getOne(null, idMetre);
    if (meter.electrodomestic) {
      throw  CustomException.clientError('El dispositivo es propiedad de otro usuario');
    }
  }

  async getOwner(serial) {
    let user;
    await this.getOne(serial).then(async value => {
      user = value['electrodomestic']['users'][0];
    });
    return user;
  }

  async deleteElectrodomestic(idMeter) {
    return this.meterModel.findOneAndUpdate({});
  }
}
