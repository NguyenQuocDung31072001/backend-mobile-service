import { IsNotEmpty } from 'class-validator';

export class UpdateInfoUser {
  username?: string;
  email?: string;
  fullname?: string;
  phone_number?: string;
  address?: string;
}

export class ChangePassword {
  @IsNotEmpty()
  oldPassword: string;
  @IsNotEmpty()
  newPassword: string;
}
