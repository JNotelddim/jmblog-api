import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { COMMENT_MODEL } from 'src/constants';
import { Comment } from 'src/interfaces/comment.interface';
import { CreateCommentDto } from 'src/comments/comments.dtos';

@Injectable()
export class CommentsService {
  constructor(
    @Inject(COMMENT_MODEL)
    private commentModel: Model<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const newComment = new this.commentModel({
      ...createCommentDto,
      createdAt: Date.now(),
      modifiedAt: Date.now(),
    });
    return newComment.save();
  }

  async getAll(): Promise<Comment[]> {
    return this.commentModel.find().exec();
  }

  async getPostComments(postId: string): Promise<Comment[]> {
    return this.commentModel.find({ post: postId }).exec();
  }

  async getUserComments(authorId: string): Promise<Comment[]> {
    return this.commentModel.find({ author: authorId }).exec();
  }
}
