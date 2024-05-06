import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { PostComment } from './entities/post-comment.entity';
import { Post } from './entities/post.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [MikroOrmModule.forFeature([Post, PostComment, User])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
