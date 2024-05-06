import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly em: EntityManager,
  ) {}

  async create(username: string) {
    const user = this.userRepository.create({ username });
    await this.em.flush();
    return user;
  }

  findOne(id: number) {
    return this.userRepository.findOneOrFail(
      { id },
      {
        populate: [
          'posts',
          'posts.likedBy',
          'posts.comments',
          'posts.comments.author',
        ],
      },
    );
  }

  findOneByUsername(username: string) {
    return this.userRepository.findOneOrFail({ username });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    file?: Express.Multer.File,
  ) {
    const user = await this.userRepository.findOneOrFail({ id });
    // @ts-expect-error wrap causes error in type system
    wrap(user).assign(updateUserDto);
    if (file) user.imageUrl = `/uploads/${file.filename}`;
    await this.em.flush();
    return user;
  }
}
