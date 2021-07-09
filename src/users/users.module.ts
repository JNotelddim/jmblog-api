import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';

import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';
import { usersProviders } from 'src/users/users.providers';

import { PostsService } from 'src/posts/posts.service';
import { postsProviders } from 'src/posts/posts.provider';

import { CommentsService } from 'src/comments/comments.service';
import { commentsProviders } from 'src/comments/comments.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    ...usersProviders,
    PostsService,
    ...postsProviders,
    CommentsService,
    ...commentsProviders,
  ],
})
export class UsersModule {}
