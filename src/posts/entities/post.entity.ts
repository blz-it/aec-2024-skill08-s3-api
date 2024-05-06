import {
  Collection,
  Embedded,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from 'src/common/entities/base.entity';
import { User } from 'src/users/entities/user.entity';
import { PostComment } from './post-comment.entity';
import { PostLocation } from './post-location.embeddable';
import { PostSticker } from './post-sticker.embeddable';

@Entity()
export class Post extends BaseEntity {
  @Property()
  imageUrl: string;

  @Property()
  caption: string;

  @ManyToOne({ entity: () => User, inversedBy: 'posts' })
  author: User;

  @Embedded(() => PostSticker, { array: true })
  stickers: PostSticker[] = [];

  @ManyToMany({ entity: () => User, inversedBy: 'likedPosts' })
  likedBy = new Collection<User>(this);

  @OneToMany({ entity: () => PostComment, mappedBy: 'post' })
  comments = new Collection<PostComment>(this);

  @Embedded(() => PostLocation)
  location: PostLocation;
}
