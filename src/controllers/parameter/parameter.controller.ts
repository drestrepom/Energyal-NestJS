import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ParameterService } from '../../services/parameter/parameter.service';

@Controller('parameter')
export class ParameterController {
  constructor(private parameterService: ParameterService) {
  }

  @Post()
  async add(@Body() body) {
    return await this.parameterService.add(body);
  }

  @Get(':user')
  async get(@Param('user') user) {
    return await this.parameterService.get(user);
  }

  @Put()
  async update(@Body() body) {
    this.parameterService.update(body);
    console.log(body);
  }
}
