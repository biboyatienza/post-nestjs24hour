import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { EmailUserDto } from "./email-user.dto";

export class LoginUserDto extends EmailUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'Password must contain at least; one uppercase, one lowercase, one digit and one special character.'})
  password: string;
}