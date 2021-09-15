import {
  Controller,
  Request,
  Post,
  UseGuards,
  ConflictException,
} from '@nestjs/common';

import { LocalAuthGuard } from 'src/passport/local.guard';
import { UsersService } from 'src/users/users.service';
import { AuthService } from 'src/auth/auth.service';

@Controller()
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('/auth/signup')
  async signup(@Request() req) {
    const { body } = req;
    const { email, password } = body;

    const existingAccount = await this.usersService.getFullUserByEmail(email);

    if (existingAccount) {
      throw new ConflictException();
    } else {
      const newUser = await this.usersService.create({ email, password });
      return { email: newUser.email };
    }
  }
}
