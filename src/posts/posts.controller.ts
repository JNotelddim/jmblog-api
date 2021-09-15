import {
  Controller,
  Get,
  Post,
  Delete,
  UseGuards,
  Request,
  Param,
  Put,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/passport/jwt.guard';
import { PostsService } from 'src/posts/posts.service';
import { CommentsService } from 'src/comments/comments.service';
import { Comment } from 'src/interfaces/comment.interface';
import {
  Post as PostInterface,
  SummarizedPost,
} from 'src/interfaces/post.interface';

@Controller()
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService,
  ) {}

  /* POST ENDPOINTS  */
  @Get('/posts')
  async getPosts(): Promise<SummarizedPost[]> {
    const fullPosts = await this.postsService.findAll();
    const summarizedPosts: SummarizedPost[] = fullPosts.map(
      ({ _id, title, authorId, createdAt, content }) => ({
        _id,
        title,
        authorId,
        createdAt,
        summary: content.slice(0, 80), // Arbitrary max length to truncate at.
      }),
    );
    return summarizedPosts;
  }

  @UseGuards(JwtAuthGuard)
  @Put('/posts')
  async putPost(@Request() req): Promise<PostInterface> {
    const { body, user } = req;
    const { id, title, content } = body;

    const exists = id !== undefined;
    if (exists) {
      return await this.postsService.update(body);
    } else {
      return await this.postsService.create({
        title,
        content,
        author: user.id,
      });
    }
  }

  @Get('/posts/:id')
  async getPost(@Param('id') id: string): Promise<PostInterface> {
    return await this.postsService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/posts/:id')
  async deletePost(@Param('id') id: string): Promise<{ success: boolean }> {
    return await this.postsService.deleteById(id);
  }

  /* COMMENTS */
  @Get('/posts/:id/comments')
  async getPostComments(@Param('id') id: string): Promise<Comment[]> {
    return await this.commentsService.getPostComments(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/posts/:id/comments')
  async createPostComment(
    @Param('id') id: string,
    @Request() req,
  ): Promise<Comment> {
    const { user, body } = req;
    const { contents } = body;

    return await this.commentsService.create({
      contents,
      author: user.id,
      post: id,
    });
  }
}
