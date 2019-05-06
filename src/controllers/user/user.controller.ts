import { Body, Controller, Get, Post, UsePipes, Param, Put, Query } from '@nestjs/common';
import { UserService } from '../../services/user/user.service';
import { DeleteBlankSpacePipe } from '../../pipes/delete-blank-space.pipe';
import * as jwt from 'jsonwebtoken';
import { IUser } from '../../interfaces/user.interface';

@Controller('user')
export class UserController {
  constructor(private userSerice: UserService) {
  }

  @Post()
  register(@Body(DeleteBlankSpacePipe) user: IUser) {
    return this.userSerice.create(user).then(value => {
      return {
        ok: true,
        user: value,
      };
    });
  }

  @Post(':login')
  async login(@Body(DeleteBlankSpacePipe) user) {
    return this.userSerice.login(user)
      .then((value) => {
        const Authorization = jwt.sign({ user: value },
          process.env.SEED, {
            expiresIn: process.env.EXPITARION,
          });
        return {
          ok: true,
          user: value,
          Authorization,
        };
      });
  }

  @Get('electrodomestics/:id')
  async getElectrodomestics(@Param('id') id) {
    return await this.userSerice.getElectrodomestics(id);
  }

  @Put()
  async cahallenPassword(@Body() body) {
    console.log(body);
    return this.userSerice.challengPassword(body.id, body.oldPassword, body.newPassword).then(value => {
      return { ok: value };
    });
  }

  @Get('/email/:email')
  async emailExist(@Param('email') email) {
    return await this.userSerice.emailExist(email).then(value => value);
  }

  @Get(':email')
  userExist(@Param('email') email) {
    return this.userSerice.userExist(email).then(value => value);
  }

  @Get()
  simple() {
    return 'hola mijo'
  }
}
