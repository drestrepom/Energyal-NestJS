import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MeterService } from '../meter/meter.service';
import { IElectrodomestic } from '../../interfaces/electrodomestic.interface';
import { IMeter } from '../../interfaces/meter.interface';
import { CustomException } from '../../utils/custom-exception';
import { UserService } from '../user/user.service';

@Injectable()
export class ElectrodomesticService {
  // @ts-ignore
  constructor(@InjectModel('Electrodomestic') private electrodomesticModel: Model,
              private meterService: MeterService,
              private  userService: UserService) {
  }

  async register(electro: IElectrodomestic, user: String) {
    const meter: IMeter = await this.meterService.getOne(electro.meter);
    electro.meter = meter._id;
    electro.users = [{ user }];
    await this.meterService.property(meter._id);
    const newElctro: IElectrodomestic = await new this.electrodomesticModel(electro).save().catch(async reason => {
      await CustomException.saveExceptio(reason);
    });
    await this.meterService.setElectrodomestic(newElctro._id, newElctro.meter);
    this.userService.addElectrodomestic(electro.users[0].user, newElctro._id, 'ADMIN');
    return newElctro;
  }

  async getOne(idElectro) {
    return await this.electrodomesticModel.findById(idElectro)
      .populate('users.user', 'name')
      .catch(err => {
        throw CustomException.clientError('No se ha encontrado el electrodoméstico');
      });
  }

}
