// Modules
import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';

// Local imports
import { User } from 'src/interfaces';
import { USER_MODEL } from 'src/constants';
import { CreateUserDto } from 'src/dataTransferObjects';

// Exports
@Injectable()
export class UsersService {
  constructor(
    // TODO: why is this failing? app.module > users.module > users.providers -- it's imported!
    @Inject(USER_MODEL)
    private userModel: Model<User>,
  ) {}

  // async checkIfUserExists(createUserDto: CreateUserDto): Promise<boolean>

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }
}
