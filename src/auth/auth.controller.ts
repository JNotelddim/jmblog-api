import {
  Controller,
  Request,
  Post,
  UseGuards,
  ConflictException,
} from '@nestjs/common';

import { LocalAuthGuard } from 'src/passport/guards/local.guard';
import { UsersService } from 'src/users/users.service';

@Controller()
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  async login(@Request() req) {
    // TODO: establish cookie / token
    return req.user;
  }

  @Post('/auth/signup')
  async signup(@Request() req) {
    const { body } = req;
    const { email, password } = body;

    const existingAccount = await this.usersService.findByEmail(email);

    if (existingAccount) {
      throw new ConflictException();
    } else {
      const newUser = await this.usersService.create({ email, password });
      return { email: newUser.email };
    }
  }
}
