import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    // TODO: handle salting + hashing password
    const reconstructedHash = pass + '__';
    if (user && user.hash === reconstructedHash) {
      const { salt, hash, iterations, ...result } = user;

      return result;
    }

    return null;
  }
}
