import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class StudentSignupDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(15)
  password: string;

  @IsNotEmpty()
  country: string;
}

export class StudentLoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(15)
  password: string;
}
