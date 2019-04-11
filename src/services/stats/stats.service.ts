import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NewExpression } from '@babel/types';
import { Observable } from 'rxjs';
import { date } from 'joi';
import { IMeasurment } from '../../interfaces/measurment.interface';
import { fdatasyncSync } from 'fs';
import { ElectrodomesticService } from '../electrodomestic/electrodomestic.service';
import { error } from 'util';
import { UserService } from '../user/user.service';

@Injectable()
export class StatsService {
// @ts-ignore
  constructor(
    // @ts-ignore
    @InjectModel('Measurement') private measurementModel: Model,
    // @ts-ignore
    @InjectModel('User') private userModel: Model,
    // @ts-ignore
    @InjectModel('Electrodomestic') private electrodomesticModel: Model,
    // @ts-ignore
    @InjectModel('Electrodomestic') private meterModel: Model,
    private electrodomesticService: ElectrodomesticService,
    private userService: UserService,
  ) {
  }

  // @ts-ignore
  async electrodomestic(start: Date, end: Date, idMeter: string, length: number) {
    const kWh = [];
    const money = [];
    for (let i = 0; i < length; i++) {
      kWh.push(0);
    }
    for (let i = 0; i < length; i++) {
      money.push(0);
    }
    const data: [IMeasurment] = await this.measurementModel.find({
      meter: idMeter,
      startTime: { $gte: start, $lte: end },
    }, 'endTime startTime kwh value');
    const dates = [];
    const div = (end.getTime() - start.getTime()) / length;
    for (let i = 0; i <= length; i++) {
      const itemDate = new Date(start.getTime() + (i * div));
      dates.push(itemDate);
    }
    let aux = 0;
    for (let j = 0; j < data.length; j++) {
      if (data[j].startTime < dates[aux + 1]) {
        kWh[aux] += data[j].kwh;
        money[aux] += data[j].value;
      } else {
        aux++;
      }
    }
    return { kWh, money };
  }

  // @ts-ignore
  async global(start?: Date, end?: Date, user: string, length?: number) {
    const kWh = [];
    const money = [];
    let meters = [];
    for (let i = 0; i < length; i++) {
      kWh.push(0);
    }
    for (let i = 0; i < length; i++) {
      money.push(0);
    }
    await this.userModel.findById(user, 'electrodomestics')
      .populate('electrodomestic').then(async value => {
        const idsElectro = value.electrodomestics.map((electro) => electro.electrodomestic);
        const auxMeters = await this.electrodomesticModel.find({ _id: { $in: idsElectro } });
        meters = auxMeters.map((item) => item.meter);
      });
    const data: [IMeasurment] = await this.measurementModel.find({
      meter: { $in: meters },
      startTime: { $gte: start, $lte: end },
    }, 'endTime startTime kwh value');
    const dates: Date[] = [];
    const div = (end.getTime() - start.getTime()) / length;
    for (let i = 0; i < length; i++) {
      const itemDate = new Date(start.getTime() + ((i + 1) * div));
      dates.push(itemDate);
    }
    const dbDates = data.map(value => {
      value.endTime.setHours(value.endTime.getHours() + 5);
      value.startTime.setHours(value.startTime.getHours() + 5);
      return value.startTime;
    });
    let aux = 0;
    for (let j = 0; j < dbDates.length; j++) {
      if (dbDates[j] < dates[aux]) {
        kWh[aux] += data[j].kwh;
        money[aux] += data[j].value;
      } else {
        aux++;
      }
    }
    return { kWh, money };
  }

  async sumUser(user: string, start?: Date, end?: Date) {
    let dates;
    const meters = await this.userService.getMeters(user);
    return await this.measurementModel.aggregate([
      {
        $match: {
          meter: { $in: meters },
          startTime: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: null,
          kwh: { $sum: '$kwh' }, // Suma de los kwh
          value: { $sum: '$value' }, // suma del monye
        },
      },
    ]);
  }

}
