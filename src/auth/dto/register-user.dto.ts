import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { IsString } from "class-validator";
import { LoginUserDto } from "./login-user.dto";

export class RegisterUserDto extends LoginUserDto {
  @IsString()
  @ApiProperty({default: 'USER', required: false})
  role: Role;
}