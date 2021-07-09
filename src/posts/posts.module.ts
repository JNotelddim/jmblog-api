import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { postsProviders } from './posts.provider';
import { CommentsService } from 'src/comments/comments.service';
import { commentsProviders } from 'src/comments/comments.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [PostsController],
  providers: [
    PostsService,
    ...postsProviders,
    CommentsService,
    ...commentsProviders,
  ],
})
export class PostsModule {}
