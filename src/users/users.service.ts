// Modules
import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';

// Local imports
import { User } from 'src/interfaces/user.interface';
import { USER_MODEL } from 'src/constants';
import { CreateUserDto } from 'src/users/user.dtos';

// Exports
@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_MODEL)
    private userModel: Model<User>,
  ) {}

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

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }
}
