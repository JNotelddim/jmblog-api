import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';

import { JwtAuthGuard } from 'src/passport/jwt.guard';
import { UsersService } from 'src/users/users.service';
import { PostsService } from 'src/posts/posts.service';
import { CommentsService } from 'src/comments/comments.service';

import { User } from 'src/interfaces/user.interface';
import { Comment } from 'src/interfaces/comment.interface';
import { Post } from 'src/interfaces/post.interface';

@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@Request() req): Promise<User> {
    const user = req.user;
    const result = await this.usersService.findById(user.id);
    return result;
  }

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

  @UseGuards(JwtAuthGuard)
  @Get('/user/:id/posts')
  async getUserPosts(@Param('id') id: string): Promise<Post[]> {
    return await this.postsService.findByAuthorId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/:id/comments')
  async getUserComments(@Param('id') authorId: string): Promise<Comment[]> {
    return await this.commentsService.getUserComments(authorId);
  }
}
