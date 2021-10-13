import {
  Controller,
  Get,
  Param,
  UseGuards,
  Request,
  Put,
  Post,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/passport/jwt.guard';
import { UsersService } from 'src/users/users.service';
import { PostsService } from 'src/posts/posts.service';
import { CommentsService } from 'src/comments/comments.service';

import { UserProfile } from 'src/interfaces/user.interface';
import { Comment } from 'src/interfaces/comment.interface';
import { Post as IPost } from 'src/interfaces/post.interface';

@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/user')
  async getProfile(@Request() req): Promise<UserProfile> {
    const { id } = req.user;
    return await this.usersService.findById(id);
  }

  @Get('/user/:id')
  async getUser(@Param('id') id: string): Promise<UserProfile> {
    return await this.usersService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/users')
  async getUsers(): Promise<UserProfile[]> {
    return await this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/user/password')
  async updatePassword(@Request() req): Promise<UserProfile> {
    // feels like `updatePassword` ought to have an empty return body maybe?
    const { id } = req.user;
    const { oldPassword, newPassword } = req.body;

    const success = await this.usersService.verifyOldPassword(id, oldPassword);
    if (success) {
      // if not success, the exception will have thrown via the verify fn
      return await this.usersService.updatePassword({ id, newPassword });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('/user/:id')
  async updateUser(
    @Param('id') id: string,
    @Request() req,
  ): Promise<UserProfile> {
    return await this.usersService.updateProfile({ id, ...req.body });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/:id/posts')
  async getUserPosts(@Param('id') id: string): Promise<IPost[]> {
    return await this.postsService.findByAuthorId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/:id/comments')
  async getUserComments(@Param('id') authorId: string): Promise<Comment[]> {
    return await this.commentsService.getUserComments(authorId);
  }
}
