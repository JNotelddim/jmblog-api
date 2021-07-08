import {
  Controller,
  Request,
  Post,
  UseGuards,
  ConflictException,
} from '@nestjs/common';

import { LocalAuthGuard } from 'src/passport/guards/local.guard';
// import { User } from 'src/interfaces/user.interface';
import { UsersService } from 'src/users/users.service';

@Controller()
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  async login(@Request() req) {
    // Trim out data?

    console.log(req);
    return req.user;
  }

  @Post('/auth/signup')
  async signup(@Request() req) {
    // Trim out data?

    const { body } = req;
    const { email, password } = body;

    const existingAccount = await this.usersService.findByEmail(email);

    if (existingAccount) {
      throw new ConflictException();
    } else {
      const newUser = await this.usersService.create({ email, password });
      req.user = { email: newUser.email };
      return req.user;
    }

    return req.user;
  }
}
