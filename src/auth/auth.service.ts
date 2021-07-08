import { Injectable } from '@nestjs/common';

import { UsersService } from 'src/users/users.service';

const ITERATIONS = 10000;

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    // console.log({ user });
    // TODO: hash password with salt stored, and see if resulting hash matches saved hash
    const { salt, hash, iterations, ...result } = user;
    // const reconstructedHash = CryptoJS.HmacSHA256(pass, salt);
    const reconstructedHash = pass + '__'; // TODO when ^ is in

    if (user && user.hash === reconstructedHash) {
      // Validated!
      return result;
    }

    return null;
  }
}
