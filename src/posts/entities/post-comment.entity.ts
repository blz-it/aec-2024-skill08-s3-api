import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from 'src/common/entities/base.entity';
import { User } from 'src/users/entities/user.entity';
import { Post } from './post.entity';

@Entity()
export class PostComment extends BaseEntity {
  @Property()
  text: string;

  @ManyToOne({ entity: () => User, inversedBy: 'comments' })
  author: User;

  @ManyToOne({ entity: () => Post, inversedBy: 'comments' })
  post: Post;
}
