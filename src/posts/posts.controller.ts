import {
  Body,
  Controller,
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
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
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
        fileIsRequired: false,
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

  @Post(':id/like')
  like(@User() user: UserPayload, @Param('id') id: string) {
    return this.postsService.like(+id, user.sub);
  }

  @Post(':id/unlike')
  unlike(@User() user: UserPayload, @Param('id') id: string) {
    return this.postsService.unlike(+id, user.sub);
  }
}
