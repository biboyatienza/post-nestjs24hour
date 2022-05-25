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
    return await this.imageService.getImages(limit);
  }
}
