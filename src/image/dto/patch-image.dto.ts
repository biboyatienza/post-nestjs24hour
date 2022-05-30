import { IsNotEmpty, IsNumber, IsUrl } from "class-validator";

export class PatchImageDto{
  @IsNumber()
  @IsNotEmpty()
  hits: number;

  @IsUrl()
  @IsNotEmpty()
  uri: string;
}