import { IsNotEmpty, IsString } from 'class-validator';

export class CommentPostDto {
  @IsString()
  @IsNotEmpty()
  text: string;
}
