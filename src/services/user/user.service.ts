import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from '../../interfaces/user.interface';
import { UserDto } from '../../classes/user-dto';
import { DeleteBlankSpacePipe } from '../../pipes/delete-blank-space.pipe';
import { EncryptPipe } from '../../pipes/encrypt.pipe';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { error } from 'util';
import { CustomException } from '../../utils/custom-exception';

@Injectable()
export class UserService {
  // @ts-ignore
  constructor(@InjectModel('User') private userModel: Model) {
  }

  async create(userDto: UserDto): Promise<IUser> {
    userDto.password = new EncryptPipe().transform(userDto.password);
    const createUser = new this.userModel(userDto);
    return await createUser.save().catch(reason => {
      new CustomException().saveExceptio(reason);
    });
  }

  async login(userDto: UserDto): Promise<IUser> {
    return await this.userModel.findOne({ email: userDto.email }, async (err, res: IUser) => {
      if (err) {
        throw new HttpException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: err,
        }, 400);
      }
      if (!res) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: 'Usuario o contraseña incorrecta',
        }, 400);
      }
      if (!bcrypt.compareSync(userDto.password, res.password)) {
        throw new HttpException({
          status: HttpStatus.UNAUTHORIZED,
          error: 'Usuario o contraseña incorrecta',
        }, 400);
      }
      return await res;
    });
  }

  async findAll(): Promise<[IUser]> {
    return await this.userModel.find().exec();
  }
}
