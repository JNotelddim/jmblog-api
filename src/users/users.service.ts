// Modules
import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { randomBytes, pbkdf2Sync } from 'crypto';

// Local imports
import { User } from 'src/interfaces/user.interface';
import { USER_MODEL, HASHING_ITERATIONS } from 'src/constants';
import { CreateUserDto } from 'src/users/user.dtos';

// Exports
@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_MODEL)
    private userModel: Model<User>,
  ) {}

  async create({ email, password }: CreateUserDto): Promise<User> {
    const salt = randomBytes(128).toString('utf-8');
    const hash = pbkdf2Sync(password, salt, HASHING_ITERATIONS, 256, 'sha256');

    const createdUser = new this.userModel({
      email,
      salt,
      hash,
      iterations: HASHING_ITERATIONS,
    });
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
