import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserBodyDTO {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;
}
