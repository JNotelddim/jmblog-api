import { Controller, Get, Param } from '@nestjs/common';
import { User } from 'src/models';
import { UserService } from '../services/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/users')
  async getUsers(): Promise<string> {
    return await this.userService.getUsers();
  }

  @Get('/user/:id')
  async getUser(@Param('id') id: string): Promise<Partial<User>> {
    return await this.userService.getUser(id);
  }
}
