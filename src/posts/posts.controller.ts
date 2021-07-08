import {
  Controller,
  Get,
  Post,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';

import { Post as PostInterface } from 'src/interfaces/post.interface';
import { PostsService } from 'src/posts/posts.service';
import { JwtAuthGuard } from 'src/passport/jwt.guard';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/posts')
  async getUsers(): Promise<PostInterface[]> {
    return await this.postsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/posts')
  async createPost(@Request() req): Promise<PostInterface> {
    const { body, user } = req;
    const { title, content } = body;

    return await this.postsService.create({
      title,
      content,
      authorId: user.id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/posts/:id')
  async deletePost(@Request() req): Promise<PostInterface> {
    const { body, user } = req;
    const { title, content } = body;

    return await this.postsService.create({
      title,
      content,
      authorId: user.id,
    });
  }
}
