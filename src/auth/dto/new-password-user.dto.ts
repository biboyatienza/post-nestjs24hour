import { IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class NewPasswordUserDto {
  @IsString()
  @IsNotEmpty()
  password_reset_token: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'Password must contain at least; one uppercase, one lowercase, one digit and one special character.'})
  new_password: string;

}