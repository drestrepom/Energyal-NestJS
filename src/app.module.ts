import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './models/user.schema';
import { UserService } from './services/user/user.service';
import { UserController } from './controllers/user/user.controller';
import { ConfigModule } from './config/config.module';
const URLDB = process.env.urlDB;
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/enrgyal', {useNewUrlParser: true}),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    // ConfigModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {

 async getDatabase() {
  }
}
