import { Controller, ForbiddenException, Get, HttpCode, HttpStatus, ParseIntPipe, Query } from '@nestjs/common';
import { ImageService } from './image.service';

@Controller('images')
export class ImageController {
  private min_limit: number = 5;
  private max_limit: number = 10;

  constructor(private readonly imageService:ImageService){}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getImages(@Query('limit', ParseIntPipe) limit: number=this.min_limit): Promise<any>{
    // const allowed_limit = Number(limit >= this.max_limit ? this.max_limit : limit);
    // if(isNaN(allowed_limit)) throw new ForbiddenException('Error: [limit] should be a number. Example: limit=6');
    return await this.imageService.getImages(limit);
    // return `Hi there again - bboy (${allowed_limit})`;
  }
}
