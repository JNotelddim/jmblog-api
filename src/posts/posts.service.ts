// Modules
import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';

// Local imports
import { Post } from 'src/interfaces/post.interface';
import { POST_MODEL } from 'src/constants';
import { CreatePostDto } from 'src/posts/posts.dtos';

// Exports
@Injectable()
export class PostsService {
  constructor(
    @Inject(POST_MODEL)
    private postModel: Model<Post>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const createdPost = new this.postModel({
      ...createPostDto,
      createdAt: Date.now(),
      modifiedAt: Date.now(),
    });
    return createdPost.save();
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  async findById(id: string): Promise<Post> {
    return this.postModel.findById(id).exec();
  }

  async findByAuthorId(authorId: string): Promise<Post> {
    return this.postModel.findOne({ authorId }).exec();
  }

  async findByTitle(title: string): Promise<Post> {
    return this.postModel.findOne({ title }).exec();
  }
}
