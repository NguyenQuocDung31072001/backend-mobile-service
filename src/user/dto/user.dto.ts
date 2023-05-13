import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  content: string;
  @IsNotEmpty()
  title: string;
  description: string;
}

export class UpdatePostDto {
  @IsNotEmpty()
  id: number;
  content: string;
  @IsNotEmpty()
  title: string;
}
