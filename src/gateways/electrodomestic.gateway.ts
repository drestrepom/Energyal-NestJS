import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { ElectrodomesticService } from '../services/electrodomestic/electrodomestic.service';

@WebSocketGateway()
export class ElectrodomesticGateway {
  constructor(
    private electrodomesticService: ElectrodomesticService,
  ) {
  }

  @SubscribeMessage('switchElctro')
  switchElectro(client: any, payload: { id }) {
    this.electrodomesticService.updateOnOff(payload.id);
  }

}
