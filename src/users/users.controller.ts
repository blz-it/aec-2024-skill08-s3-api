import {
  Body,
  Controller,
  FileTypeValidator,
  ForbiddenException,
  Get,
  Param,
  ParseFilePipe,
  Patch,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { randomUUID } from 'crypto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { User, UserPayload } from 'src/auth/decorators/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
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
  update(
    @User() user: UserPayload,
    @Param('id') id: string,

    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/*' })],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
  ) {
    if (user.sub !== +id) throw new ForbiddenException();

    if (file) console.log(file);

    return this.usersService.update(+id, updateUserDto);
  }
}
