import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { UserService } from '../../services/user/user.service';
import { UserDto } from '../../classes/user-dto';
import { DeleteBlankSpacePipe } from '../../pipes/delete-blank-space.pipe';
import * as jwt from 'jsonwebtoken';

@Controller('user')
export class UserController {
  constructor(private userSerice: UserService) {
  }

  @Post()
  register(@Body(DeleteBlankSpacePipe) user: UserDto) {
    console.log('new USer');
    return this.userSerice.create(user).then(value => {
      return {
        ok: true,
        user: value,
      };
    });
  }

  @Post(':login')
  async login(@Body(DeleteBlankSpacePipe) user: UserDto) {
    return await this.userSerice.login(user).then(value => {
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
}
