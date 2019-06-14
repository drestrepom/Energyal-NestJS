import { Injectable } from '@nestjs/common';
import { MeterService } from '../meter/meter.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IMeasurment } from '../../interfaces/measurment.interface';
import { CustomException } from '../../utils/custom-exception';
import { MeasurementGateway } from '../../gateways/measurement.gateway';
import { UserService } from '../user/user.service';
import { ValueKwhService } from '../value-kwh/value-kwh.service';
import { ElectrodomesticService } from '../electrodomestic/electrodomestic.service';

@Injectable()
export class MeasurementService {
  // @ts-ignore
  constructor(@InjectModel('Measurement') private measurementModel: Model,
              private meterService: MeterService,
              private  socket: MeasurementGateway,
              private userService: UserService,
              private valueKwhService: ValueKwhService,
) {
  }

  async insert(measurement: IMeasurment) {
    measurement.endTime = new Date();
    measurement.startTime = new Date(new Date().getTime() - measurement.interval);
    measurement.endTime.setHours(measurement.endTime.getHours() - 5);
    measurement.startTime.setHours(measurement.startTime.getHours() - 5);
    let result;
    let exception;
    const meter = await this.meterService.getOne(measurement.meter);
    if (!meter.electrodomestic) {
      return Promise.reject(CustomException.clientError('No ha sido registrado por ningún usuario'));
    }
    const client = await this.meterService.getOwner(meter.serial);
    const user = await this.userService.getOne(client.user);
    const valueKwh = await this.valueKwhService.get(user.stratum);
    measurement.meter = meter._id;
    const power: number = meter.electrodomestic.voltage * measurement.irms;
    measurement.kwh = power / 1000;
    measurement.value = (power / 1000) * valueKwh.value;
    const newMeasurement = new this.measurementModel(measurement);
    await newMeasurement.save().then(async (res) => {
      if (!res) {
        exception = 'No se encontró el medidor';
      }
      this.socket.sendMeasurements(res, client.user);
      result = res;
    }).catch(reason => {
      exception = reason;
    });
    return await result == null ? Promise.reject(exception) : Promise.resolve(result);
  }
}
