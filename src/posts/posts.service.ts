// Modules
import { Model } from 'mongoose';
import { Injectable, Inject, BadRequestException } from '@nestjs/common';

// Local imports
import { Post } from 'src/interfaces/post.interface';
import { POST_MODEL } from 'src/constants';
import { CreatePostDto, UpdatePostDto } from 'src/posts/posts.dtos';

// Exports
@Injectable()
export class PostsService {
  constructor(
    @Inject(POST_MODEL)
    private postModel: Model<Post>,
  ) {}

  async create(putPostDto: CreatePostDto): Promise<Post> {
    const createdPost = new this.postModel({
      ...putPostDto,
      createdAt: new Date(),
      modifiedAt: new Date(),
    });
    return createdPost.save();
  }

  async update({ id, title, content }: UpdatePostDto): Promise<Post> {
    await this.postModel.updateOne(
      { id },
      {
        title,
        content,
        modifiedAt: new Date(),
      },
    );
    return this.postModel.findById(id);
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  async findById(id: string): Promise<Post> {
    return this.postModel.findById(id).exec();
  }

  async findByAuthorId(authorId: string): Promise<Post[]> {
    return await this.postModel.find({ author: authorId }).exec();
  }

  async findByTitle(title: string): Promise<Post[]> {
    return this.postModel.find({ title }).exec();
  }

  async deleteById(id: string): Promise<{ success: boolean }> {
    // TODO: how to handle this without a try-catch?
    // TODO: ensure this is a soft delete, otherwise re-add `isDeleted` to model
    try {
      await this.postModel.findByIdAndDelete(id).exec();
      // TODO: what's a better return value?
      return { success: true };
    } catch (e) {
      return { success: false };
    }
  }
}
