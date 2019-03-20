import { Body, Controller, Get, Post, Query, Param, Put } from '@nestjs/common';
import { IMeter } from '../../interfaces/meter.interface';
import { DeleteBlankSpacePipe } from '../../pipes/delete-blank-space.pipe';
import { MeterService } from '../../services/meter/meter.service';

@Controller('meter')
export class MeterController {
  constructor(private meterService: MeterService) {
  }

  @Post()
  async register(@Body(DeleteBlankSpacePipe) body: IMeter) {
    return await this.meterService.register(body).then(value => {
      return {
        ok: true,
        electrodoemstic: value,
      };
    });
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.meterService.getOne(id).catch(reason => {
      console.log(reason);
    });
  }
}
