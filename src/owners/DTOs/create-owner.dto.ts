import { IsString, IsEmail, IsPhoneNumber } from 'class-validator';

export class CreateOwnerDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('ID')
  phone: string;
}
