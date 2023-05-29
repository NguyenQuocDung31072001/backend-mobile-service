import { IsNotEmpty } from 'class-validator';

export class CreateNewRatingDto {
  @IsNotEmpty()
  id_user: string;

  @IsNotEmpty()
  id_product: string;

  @IsNotEmpty()
  rating: number;
}
export class UpdateRatingDto {
  @IsNotEmpty()
  new_rating: number;
}

export class DeteleRatingDto {
  @IsNotEmpty()
  id_product: string;
}
