import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { UserPayload } from 'src/auth/decorators/user.decorator';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: EntityRepository<Post>,
    private readonly em: EntityManager,
  ) {}

  async create(
    createPostDto: CreatePostDto,
    user: UserPayload,
    file: Express.Multer.File,
  ) {
    const post = this.postRepository.create({
      ...createPostDto,
      imageUrl: file ? `/uploads/${file.filename}` : undefined,
      author: user.sub,
    });
    await this.em.flush();
    return post;
  }

  findAll() {
    return this.postRepository.findAll({ populate: ['author'] });
  }
}
