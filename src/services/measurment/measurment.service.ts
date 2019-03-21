import { Injectable } from '@nestjs/common';
import { MeterService } from '../meter/meter.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IMeasurment } from '../../interfaces/measurment.interface';
import { CustomException } from '../../utils/custom-exception';

@Injectable()
export class MeasurmentService {
  // @ts-ignore
  constructor(@InjectModel('Measurement') private measurementModel: Model, private meterService: MeterService) {
  }

  async insert(measurement: IMeasurment) {
    const meter = await this.meterService.getOne(measurement.meter);
    measurement.meter = meter._id;
    measurement.power = meter.electrodomestic.voltage * measurement.irms;
    measurement.endTime = new Date();
    measurement.startTime = new Date(measurement.endTime.getTime() - measurement.interval);
    const joules = measurement.power * measurement.interval;
    console.log('joules', joules);
    console.log('kwh', measurement.kwh);
    measurement.kwh = joules / 3600000;
    measurement.value = measurement.kwh * 217.53;
    const newMeasurement = new this.measurementModel(measurement);
    return await newMeasurement.save().catch(reason => CustomException.saveExceptio(reason));
  }
}
