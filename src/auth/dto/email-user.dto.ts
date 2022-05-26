import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";

export class EmailUserDto{
  @IsNotEmpty()
  @MaxLength(256)
  @IsEmail()
  email: string;
}