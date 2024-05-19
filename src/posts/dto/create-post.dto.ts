import { Transform, Type } from 'class-transformer';
import {
  IsDecimal,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { stickers } from '../constants';

class StickerDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(stickers.map((sticker) => sticker.name))
  name: string;

  @IsDecimal()
  x: number;

  @IsDecimal()
  y: number;

  @IsInt()
  @Transform(({ value }) => parseInt(value))
  rotation: number;
}

class LocationDto {
  @IsDecimal()
  latitude: number;

  @IsDecimal()
  longitude: number;
}

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  caption: string;

  @IsOptional()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => StickerDto)
  stickers?: StickerDto[];

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;
}
