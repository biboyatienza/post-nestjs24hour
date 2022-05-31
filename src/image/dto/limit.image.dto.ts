import { ApiProperty } from "@nestjs/swagger";

export class LimitImageDTO {
  @ApiProperty({default: 5, required: false})
  limit: Number
}
