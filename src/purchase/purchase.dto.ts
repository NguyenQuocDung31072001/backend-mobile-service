import { IsNotEmpty } from 'class-validator';

export class CreatePurchaseDto {
  @IsNotEmpty()
  id_user: string;
}
