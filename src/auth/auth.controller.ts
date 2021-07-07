import { Controller, Request, Post, UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from 'src/passport/guards/local.guard';

@Controller()
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  async login(@Request() req) {
    // Trim out data?
    return req.user;
  }
}
