import { Transform, Type } from 'class-transformer';
import {
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class StickerDto {
  @IsString()
  @IsNotEmpty()
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
