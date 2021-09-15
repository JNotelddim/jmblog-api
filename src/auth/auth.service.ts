import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { pbkdf2Sync } from 'crypto';

import { UsersService } from 'src/users/users.service';
import { User } from 'src/interfaces/user.interface';
import { JWTPayload } from 'src/interfaces/jwt.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getFullUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const { salt, hash, iterations, _id /*, username */ } = user;
    const generatedHash = pbkdf2Sync(password, salt, iterations, 256, 'sha256');

    if (hash !== generatedHash.toString()) {
      throw new UnauthorizedException();
    }

    return { email, id: _id };
  }

  async login(user: User) {
    const payload: JWTPayload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
