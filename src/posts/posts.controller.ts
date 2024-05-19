import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { randomUUID } from 'crypto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { User, UserPayload } from 'src/auth/decorators/user.decorator';
import { stickers } from './constants';
import { CommentPostDto } from './dto/comment-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './static/uploads',
        filename: (_, file, cb) => {
          const filename = randomUUID() + extname(file.originalname);
          cb(null, filename);
        },
      }),
    }),
  )
  create(
    @User() user: UserPayload,
    @Body() createPostDto: CreatePostDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/*' })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.postsService.create(createPostDto, user, file);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Post(':id/likes')
  like(@User() user: UserPayload, @Param('id') id: string) {
    return this.postsService.like(+id, user.sub);
  }

  @Delete(':id/likes')
  unlike(@User() user: UserPayload, @Param('id') id: string) {
    return this.postsService.unlike(+id, user.sub);
  }

  @Post(':id/comments')
  comment(
    @User() user: UserPayload,
    @Param('id') id: string,
    @Body() commentPostDto: CommentPostDto,
  ) {
    return this.postsService.comment(+id, user.sub, commentPostDto);
  }

  @Get('stickers')
  getStickers() {
    return stickers;
  }
}
