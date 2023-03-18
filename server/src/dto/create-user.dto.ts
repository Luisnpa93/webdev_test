import { IsEmail, IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsInt()
  age: number;

 
}
