import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { postsProviders } from './posts.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [PostsController],
  providers: [PostsService, ...postsProviders],
})
export class PostsModule {}
