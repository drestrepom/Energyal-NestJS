import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ValueKwhService } from '../../services/value-kwh/value-kwh.service';

@Controller('value-kwh')
export class ValueKwhController {
  constructor(private valueKwhService: ValueKwhService) {
  }

  @Post()
  async register(@Body() body) {
    return await this.valueKwhService.register(body);
  }

  @Get(':stratum')
  async get(@Param('stratum') stratum) {
    return await this.valueKwhService.get(stratum);
  }
}
