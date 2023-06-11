import { IsNotEmpty } from 'class-validator';

export class CreatePurchaseDto {
  @IsNotEmpty()
  id_user: string;

  @IsNotEmpty()
  shipping_address: string;

  @IsNotEmpty()
  credit_card_number: string;

  @IsNotEmpty()
  expired_date: string;

  @IsNotEmpty()
  cvv: string;
}
