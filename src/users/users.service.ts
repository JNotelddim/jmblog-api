// Modules
import { Model } from 'mongoose';
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { randomBytes, pbkdf2Sync } from 'crypto';

// Local imports
import { User, UserProfile } from 'src/interfaces/user.interface';
import { USER_MODEL, HASHING_ITERATIONS } from 'src/constants';
import {
  CreateUserDto,
  UpdateUserDto,
  UpdatePasswordDto,
} from 'src/users/user.dtos';

// Exports
@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_MODEL)
    private userModel: Model<User>,
  ) {}

  private convertUserToProfile({
    id,
    firstName,
    lastName,
    email,
    userName,
    createdAt,
  }: User): UserProfile {
    return {
      id,
      firstName,
      lastName,
      email,
      userName,
      createdAt,
    };
  }

  private saltAndHashPassword(value: string) {
    const salt = randomBytes(128).toString('utf-8');
    const hash = pbkdf2Sync(
      value,
      salt,
      HASHING_ITERATIONS,
      256,
      'sha256',
    ).toString('utf-8');

    return { salt, hash };
  }

  async create({ email, password }: CreateUserDto): Promise<UserProfile> {
    const { salt, hash } = this.saltAndHashPassword(password);

    const createdUser = new this.userModel({
      email,
      salt,
      hash,
      iterations: HASHING_ITERATIONS,
      createdAt: new Date(),
    });
    createdUser.save();
    return this.convertUserToProfile(createdUser);
  }

  async verifyOldPassword(id: string, oldPassword: string) {
    const { salt, hash, iterations } = await this.userModel.findById(id).exec();
    const generatedHash = pbkdf2Sync(
      oldPassword,
      salt,
      iterations,
      256,
      'sha256',
    );

    if (hash !== generatedHash.toString()) {
      throw new UnauthorizedException();
    }
    return true;
  }

  async updatePassword({
    id,
    newPassword,
  }: UpdatePasswordDto): Promise<UserProfile> {
    const { salt, hash } = this.saltAndHashPassword(newPassword);

    await this.userModel.updateOne({ _id: id }, { salt, hash });
    const user = await this.userModel.findById(id).exec();
    return this.convertUserToProfile(user);
  }

  async updateProfile({
    id,
    email,
    firstName,
    lastName,
    userName,
  }: UpdateUserDto): Promise<UserProfile> {
    await this.userModel.updateOne(
      { _id: id },
      { email, firstName, lastName, userName },
    );
    const user = await this.userModel.findById(id).exec();
    return this.convertUserToProfile(user);
  }

  async findAll(): Promise<UserProfile[]> {
    const users = await this.userModel.find().exec();
    return users.map((user) => this.convertUserToProfile(user));
  }

  async findById(id: string): Promise<UserProfile> {
    const user = await this.userModel.findById(id).exec();
    return this.convertUserToProfile(user);
  }

  async getFullUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }
}
