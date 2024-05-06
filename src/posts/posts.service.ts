import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { UserPayload } from 'src/auth/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: EntityRepository<Post>,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
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
    return this.postRepository.findAll({
      populate: ['author', 'likedBy', 'comments'],
    });
  }

  async like(id: number, userId: number) {
    const post = await this.postRepository.findOneOrFail(
      { id },
      { populate: ['author', 'likedBy', 'comments'] },
    );
    const user = await this.userRepository.findOneOrFail({ id: userId });

    if (!post.likedBy.contains(user)) post.likedBy.add(user);

    await this.em.flush();
    return post;
  }

  async unlike(id: number, userId: number) {
    const post = await this.postRepository.findOneOrFail(
      { id },
      { populate: ['author', 'likedBy', 'comments'] },
    );
    const user = await this.userRepository.findOneOrFail({ id: userId });

    if (post.likedBy.contains(user)) post.likedBy.remove(user);

    await this.em.flush();
    return post;
  }
}
