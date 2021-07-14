import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async authenticate(req) {
    const { email, password } = req.body;
    try {
      const user = await this.authService.validateUser(email, password);
      this.success(user);
    } catch (err) {
      this.fail(err);
    }
  }
}
