import { IsEmail, IsString, MinLength } from "class-validator";

export class SignUpDto {
  @IsString()
  @MinLength(1)
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;
}

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(1)
  password!: string;
}

export class PasswordResetRequestDto {
  @IsEmail()
  email!: string;
}

export class PasswordResetConfirmDto {
  @IsString()
  @MinLength(1)
  token!: string;

  @IsString()
  @MinLength(8)
  password!: string;
}

export class OAuthTestCallbackDto {
  @IsString()
  @MinLength(1)
  subject!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(1)
  name!: string;
}
