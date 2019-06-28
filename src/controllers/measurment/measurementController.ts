import { Body, Controller, Post } from '@nestjs/common';
import { MeasurementService } from '../../services/measurment/measurement.service';
import { MeterService } from '../../services/meter/meter.service';
import { ElectrodomesticService } from '../../services/electrodomestic/electrodomestic.service';
import { ElectrodomesticDto } from '../../dto/electrodomestic.dto';

/**
 * Clase para manejar los enpoints para las mediciones.
 * @export
 * @class MeasurementController
 */
@Controller('measurement')
export class MeasurementController {
  /**
   * Creates an instance of MeasurementController.
   * @param {MeasurementService} measurementService Inyección del servicio de medicion.
   * @param {MeterService} meterService Inyección del medidor.
   * @param {ElectrodomesticService} electrodomesticService Inyección de del servicion de electrodomestico.
   * @memberof MeasurementController
   */
  constructor(
    private measurementService: MeasurementService,
    private meterService: MeterService,
    private electrodomesticService: ElectrodomesticService) {
  }

  /**
   * Enpoint para registrar una medicion.
   * @param {*} body Saca el cuerpo de la petición
   * @returns Retorna si el electrodomestico esta ecendido o apagado
   * @memberof MeasurementController
   */
  @Post()
  async insertMeasurement(@Body() body) {
    const measurement = this.measurementService.insert(body).catch(error => console.log(error));
    const meter = await this.meterService.getOne(body.meter);
    const electrodomestic: ElectrodomesticDto = await this.electrodomesticService.getOne(meter.electrodomestic._id);
    return { onOff: electrodomestic.onOff };
  }
}
