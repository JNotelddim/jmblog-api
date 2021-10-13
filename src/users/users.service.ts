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

  /**
   * converUserToProfile takes a user object and just prunes out all the
   * sensitive data which is intended to stay internal to the back-end.
   * This makes the `profile` data shareable with external consumers.
   */
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

  /**
   * saltAndHashPassword takes a password value and salts + hashes it.
   */
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

  /**
   * create just makes a new user with the email and password provided.
   */
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

  // I'd prefer for this to be in the Auth service, but that would for me to make
  // the UsersService use the AuthService, which would create a circular dependency,
  // and while I believe there are ways to make that work, it wasn't working for me months
  // ago when I was setting all this up. So for now I'll just have this here.
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

  /**
   * updatePassword takes a new password string and salts+hashes it,
   * then updates the user db instance with the new values.
   */
  async updatePassword({
    id,
    newPassword,
  }: UpdatePasswordDto): Promise<UserProfile> {
    const { salt, hash } = this.saltAndHashPassword(newPassword);

    await this.userModel.updateOne({ _id: id }, { salt, hash });
    const user = await this.userModel.findById(id).exec();
    return this.convertUserToProfile(user);
  }

  /**
   * updateProfile allows the user to update the profile fields on
   * the user - ie, there are some fields which the user isn't allowed to
   * manually change.
   */
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
