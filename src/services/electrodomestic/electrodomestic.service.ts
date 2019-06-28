import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MeterService } from '../meter/meter.service';
import { CustomException } from '../../utils/custom-exception';
import { UserService } from '../user/user.service';
import { categories } from '../../models/electrodomestic.schema';
import { ElectrodomesticDto } from '../../dto/electrodomestic.dto';
import { MeterDto } from './../../dto/meter.dto';


@Injectable()
export class ElectrodomesticService {
  // @ts-ignore
  constructor(@InjectModel('Electrodomestic') private electrodomesticModel: Model,
              private meterService: MeterService,
              private  userService: UserService) {
  }

  async register(electro: ElectrodomesticDto, user: String) {
    const meter: MeterDto = await this.meterService.getOne(electro.meter);
    electro.meter = meter._id;
    electro.users = [{ user }];
    await this.meterService.owner(meter._id);
    const newElctro: ElectrodomesticDto = await new this.electrodomesticModel(electro).save().catch(async reason => {
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

  static category() {
    return categories.values;
  }

  async updateOnOff(id) {
    let elect = null;
    await this.electrodomesticModel.findById(id, (err, res) => {
      res.onOff = !res.onOff;
      elect = res;
      res.save();
    });
    return elect;
  }

  async getOnoOff(serial) {
    return await this.electrodomesticModel.findOne({ serial }, 'onOff');
  }
}
