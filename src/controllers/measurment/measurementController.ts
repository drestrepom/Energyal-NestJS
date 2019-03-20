import { Body, Controller, Post } from '@nestjs/common';
import { MeasurmentService } from '../../services/measurment/measurment.service';
import { IMeasurment } from '../../interfaces/measurment.interface';

@Controller('measurement')
export class MeasurementController {
  constructor(private measuremestService: MeasurmentService) {
  }

  @Post()
  async register(@Body() body: IMeasurment) {
    // console.log(body);
    return await this.measuremestService.insert(body);
  }
}
