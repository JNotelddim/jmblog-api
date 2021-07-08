import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { pbkdf2Sync } from 'crypto';

import { UsersService } from 'src/users/users.service';
import { User } from 'src/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    const { salt, hash, iterations, ...result } = user;
    const generatedHash = pbkdf2Sync(password, salt, iterations, 256, 'sha256');

    if (hash !== generatedHash.toString()) {
      throw new UnauthorizedException();
    }

    return { email: result.email };
  }

  async login(user: User) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
