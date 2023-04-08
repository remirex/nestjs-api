import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  firstName?: string;
  lastName?: string;

  @IsNotEmpty()
  role: string;

  @IsNotEmpty()
  createdAt: Date;

  updatedAt?: Date;
}
