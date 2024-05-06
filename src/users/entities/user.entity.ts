import {
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  Property,
  Unique,
} from '@mikro-orm/core';
import { BaseEntity } from 'src/common/entities/base.entity';
import { PostComment } from 'src/posts/entities/post-comment.entity';
import { Post } from 'src/posts/entities/post.entity';

@Entity()
export class User extends BaseEntity {
  @Property()
  @Unique()
  username: string;

  @Property({ nullable: true })
  caption?: string;

  @Property({ nullable: true })
  imageUrl?: string;

  @OneToMany({ entity: () => Post, mappedBy: 'author' })
  posts = new Collection<Post>(this);

  @ManyToMany({ entity: () => Post, mappedBy: 'likedBy' })
  likedPosts = new Collection<Post>(this);

  @OneToMany({ entity: () => PostComment, mappedBy: 'author' })
  comments = new Collection<PostComment>(this);
}
