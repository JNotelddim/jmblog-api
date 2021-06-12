import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from 'src/interfaces';
import { UsersService } from 'src/services/users.service';
import { CreateUserDto } from 'src/dataTransferObjects';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // TODO: replace with a 'sign-in' endpoint?
  @Post('/users')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    // verify email not in use
    // salt + hash password
    // create user
    // return partial new account data
    return await this.usersService.create(createUserDto);
  }

  @Get('/users')
  async getUsers(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get('/user/:id')
  async getUser(@Param('id') id: string): Promise<Partial<User>> {
    return await this.usersService.findById(id);
  }
}
