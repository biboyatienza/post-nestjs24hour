import { Controller, ForbiddenException, Get, HttpCode, HttpStatus, ParseIntPipe, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ImageService } from './image.service';

@Controller('images')
export class ImageController {
  private min_limit: number = 5;
  private max_limit: number = 10;

  constructor(
    private readonly imageService:ImageService,
    private readonly cloudinaryService:CloudinaryService
    ){}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getImages(@Query('limit', ParseIntPipe) limit: number=this.min_limit): Promise<any>{
    return await this.imageService.getImages(limit);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File){
    this.cloudinaryService.uploadFile(file);
  }
}
