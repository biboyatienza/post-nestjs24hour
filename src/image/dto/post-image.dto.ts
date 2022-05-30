import { IsNotEmpty, IsNumber, IsUrl } from "class-validator";

export class PostImageDto{
  @IsUrl()
  @IsNotEmpty()
  uri: string;

  @IsNumber()
  owner: number
}