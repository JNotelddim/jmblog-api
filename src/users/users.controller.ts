import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { User } from 'src/interfaces/user.interface';
import { JwtAuthGuard } from 'src/passport/jwt.guard';
import { UsersService } from 'src/users/users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/users')
  async getUsers(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/:id')
  async getUser(@Param('id') id: string): Promise<Partial<User>> {
    return await this.usersService.findById(id);
  }
}
