import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  description: string;

  //   @IsNotEmpty()
  //   date: Date;

  @IsNotEmpty()
  quantity: number;
}
