import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from './events/events.module';
import { SERVICES } from './services/index.service';
import { GATEWAYS } from './gateways/index.gateway';
import { CONTROLLERS } from './controllers/index.controller';
import { MODELS } from './models/index.model';
import { UserGateway } from './gateways/user.gateway';
import { MeterGateway } from './gateways/meter.gateway';

const URLDB = process.env.urlDB || 'mongodb://localhost:27017/enrgyal';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.URLDB || 'mongodb://localhost:27017/enrgyal', { useNewUrlParser: true }),
    MongooseModule.forFeature([...MODELS]),
    EventsModule,
    // ConfigModule,
  ],
  controllers: [...CONTROLLERS],
  providers: [...SERVICES, ...GATEWAYS, UserGateway, MeterGateway],
})
export class AppModule {
}
