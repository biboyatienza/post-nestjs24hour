import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsUrl } from "class-validator";
import { isReadable } from "stream";

export class PostImageDto{
  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({default: 'https://ehrlich.ph/wp-content/uploads/2022/04/erlc-sitelogo.png', required: true})
  uri: string;

  @IsNumber()
  @ApiProperty({required: false})
  owner: number
}