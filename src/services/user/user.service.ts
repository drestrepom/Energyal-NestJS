import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from '../../interfaces/user.interface';
import { EncryptPipe } from '../../pipes/encrypt.pipe';
import * as bcrypt from 'bcrypt';
import { CustomException } from '../../utils/custom-exception';

@Injectable()
export class UserService {
  // @ts-ignore
  constructor(@InjectModel('User') private userModel: Model) {
  }

  async create(userDto: IUser): Promise<IUser> {
    userDto.password = new EncryptPipe().transform(userDto.password);
    const createUser = new this.userModel(userDto);
    return await createUser.save().catch(reason => {
      CustomException.saveExceptio(reason);
    });
  }

  async login(userDto: IUser) {
    return new Promise((resolve, reject) => {
      this.userModel.findOne({ email: userDto.email }, 'city email name password', (err, res: IUser) => {
        if (err) {
          reject(new HttpException({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: err,
          }, 400));
        }
        if (!res) {
          reject(new HttpException({
            status: HttpStatus.BAD_REQUEST,
            error: 'Usuario o contraseña incorrecta',
          }, 400));
        } else {
          if (!bcrypt.compareSync(userDto.password, res.password)) {
            reject(new HttpException({
              status: HttpStatus.UNAUTHORIZED,
              error: 'Usuario o contraseña incorrecta',
            }, 400));
          }
        }

        resolve(res);
      });
    });
  }

  async findAll(): Promise<[IUser]> {
    return await this.userModel.find().exec();
  }

  async getElectrodomestics(idUser) {
    const electros = await this.userModel.findOne({ _id: idUser })
      .populate('electrodomestics.electrodomestic', 'name')
      .exec();
    return electros;
  }

  async addElectrodomestic(idUser, idElectro, role?) {
    return await this.userModel.findOne({ _id: idUser }, (err, res) => {
      res.electrodomestics.push({ electrodomestic: idElectro , role});
      res.save();
    });
  }

  async challengPassword(idUser, newPasword): Promise<any> {
    return await this.userModel.findOneAndUpdate({ _id: idUser }, { password: new EncryptPipe().transform(newPasword) })
      .exec((err, res) => {
        if (res) {
          return true;
        } else {
          return false;
        }
      });
  }

  // async addElectrodomestic(idUser, idElectro, role?) {
  //   return await this.userModel.findOneAndUpdate({ _id: idUser }, {
  //     $push: {
  //       electrodomestics: {
  //         electrodomestic: idElectro,
  //         role,
  //       },
  //     },
  //   });
  // }
}
