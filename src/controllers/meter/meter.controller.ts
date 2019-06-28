import { Body, Controller, Get, Post, Query, Param, Put } from '@nestjs/common';
import { DeleteBlankSpacePipe } from '../../pipes/delete-blank-space.pipe';
import { MeterService } from '../../services/meter/meter.service';
import { CustomException } from '../../utils/custom-exception';
import { MeterDto } from '../../../documentation/js/search/search_index';

@Controller('meter')
export class MeterController {
  constructor(private meterService: MeterService) {
  }

  @Post()
  async register(@Body(DeleteBlankSpacePipe) body: MeterDto) {
    return await this.meterService.register(body).then(value => {
      return {
        ok: true,
        electrodoemstic: value,
      };
    });
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.meterService.getOne(id);
  }

  @Get()
  get(@Query('serial') serial) {
    console.log('serila: ', serial);
    return 'gggg';
  }
}
