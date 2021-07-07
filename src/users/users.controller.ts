import { Controller, Get, Param } from '@nestjs/common';
import { User } from 'src/interfaces/user.interface';
import { UsersService } from 'src/users/users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/users')
  async getUsers(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get('/user/:id')
  async getUser(@Param('id') id: string): Promise<Partial<User>> {
    return await this.usersService.findById(id);
  }
}
