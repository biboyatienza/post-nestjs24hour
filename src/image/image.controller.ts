import { Body, Controller, Delete, ForbiddenException, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { GetCurrentUserDecorator } from 'src/decorators';
import { PatchImageDto, PatchServiceImageDto, PostImageDto, PostServiceImageDto } from './dto';
import { ImageService } from './image.service';
import { SingleImageType } from './types';

@Controller('images')
@UseGuards(AuthGuard('jwt'))
export class ImageController {
  private min_limit: number = 5;
  private max_limit: number = 10;


  constructor(
    private readonly imageService:ImageService,
    private readonly cloudinaryService:CloudinaryService
    ){}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getImages(
    @GetCurrentUserDecorator('sub') userId: number,
    @Query('limit', ParseIntPipe) limit: number=this.min_limit
  ): Promise<any>{
    const allowed_limit = limit >= this.max_limit ? this.max_limit : limit;
    return await this.imageService.getImages(allowed_limit, userId);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File){
    this.cloudinaryService.uploadFile(file);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getImageById(
    @GetCurrentUserDecorator('sub') userId: number,
    @Param('id', ParseIntPipe) id: number
  ): Promise<SingleImageType>{
    return await this.imageService.getImageById(id, userId);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async patchImage(
    @GetCurrentUserDecorator('sub') userId: number,
    @Param('id', ParseIntPipe) imageId: number,
    @Body() dto: PatchImageDto
  ): Promise<boolean>{
    return await this.imageService.patchImage(new PatchServiceImageDto(imageId, userId, dto.hits, dto.uri));
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async postImage(
    @GetCurrentUserDecorator('sub') userId: number, 
    @Body() dto: PostImageDto
    ): Promise<boolean> {
    return this.imageService.postImage(new PostServiceImageDto(
      userId,
      isNaN(dto.owner) ? userId : dto.owner, 
      dto.uri)
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteImage(
    @GetCurrentUserDecorator('sub') userId: number, 
    @Param('id', ParseIntPipe) imageId: number
  ): Promise<boolean>{
    return this.imageService.deleteImage(imageId, userId);
  }
}
