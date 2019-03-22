import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './models/user.schema';
import { ElectrodomesticSchema } from './models/electrodomestic.schema';
import { UserService } from './services/user/user.service';
import { UserController } from './controllers/user/user.controller';
import { ConfigModule } from './config/config.module';
import { ElectrodomesticService } from './services/electrodomestic/electrodomestic.service';
import { ElectrodomesticController } from './controllers/electrodomestic/electrodomestic.controller';
import { MeterService } from './services/meter/meter.service';
import { MeterController } from './controllers/meter/meter.controller';
import { MeterSchema } from './models/meter.schema';
import { MeasurementSchema } from './models/measurment.schema';
import { MeasurementController } from './controllers/measurment/measurementController';
import { MeasurmentService } from './services/measurment/measurment.service';
import { EventsModule } from './events/events.module';
import { PruebaGateway } from './gateways/prueba.gateway';

const URLDB = process.env.urlDB;

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/enrgyal', { useNewUrlParser: true }),
    // MongooseModule.forRoot('mongodb+srv://admin:1193120855@cluster0-xjwrt.mongodb.net/enrgyal?retryWrites=true', { useNewUrlParser: true }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Electrodomestic', schema: ElectrodomesticSchema },
      { name: 'Meter', schema: MeterSchema },
      { name: 'Measurement', schema: MeasurementSchema },
    ]),
    EventsModule,
    // ConfigModule,
  ],
  controllers: [AppController, UserController, ElectrodomesticController, MeterController, MeasurementController],
  providers: [AppService, UserService, ElectrodomesticService, MeterService, MeasurmentService, PruebaGateway],
})
export class AppModule {

  async getDatabase() {
  }
}
