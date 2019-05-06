import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { MeasurementService } from '../services/measurment/measurement.service';
import { Client, Server } from 'socket.io';
import { IMeasurment } from '../interfaces/measurment.interface';
import { forwardRef, Inject } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@WebSocketGateway()
export class MeasurementGateway {
  constructor(@Inject(forwardRef(() => MeasurementService))
              private measurementService: MeasurementService) {
  }

  @WebSocketServer()
  server: Server;

  handleConnection(client: Client, ...args: any[]): any {
    console.log(`Se conecto el cliente ${client.id} ${args}`);
  }

  handleDisconnect(client: Client): any {
    // this.socketService.deleteSession(client.id);
    console.log(`Se desconecto el cliente ${client.id}`);
  }

  sendMeasurements(measurement, client) {
    this.server.emit('measurement', measurement);
  }

  @SubscribeMessage('measurement')
  async registerMeasurement(client: Client, payload: any) {
    const measurement: IMeasurment = JSON.parse(payload);
    console.log(measurement);
    return 'vdssdf';
    return await this.measurementService.insert(measurement);
  }

}
