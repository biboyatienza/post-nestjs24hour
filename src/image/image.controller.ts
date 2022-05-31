import { Body, Controller, Delete, ForbiddenException, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiHeader, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiResponseProperty, ApiTags } from '@nestjs/swagger';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { GetCurrentUserDecorator } from 'src/decorators';
import { LimitImageDTO, PatchImageDto, PatchServiceImageDto, PostImageDto, PostServiceImageDto } from './dto';
import { ImageService } from './image.service';
import { SingleImageType } from './types';

@Controller('images')
@UseGuards(AuthGuard('jwt'))
@ApiTags('images')
@ApiBearerAuth('JWT')
@ApiResponse({
  status: 401,
  description: 'Unauthorized'
})
export class ImageController {
  private min_limit: number = 5;
  private max_limit: number = 10;


  constructor(
    private readonly imageService:ImageService,
    private readonly cloudinaryService:CloudinaryService
    ){}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: `Get random images from pexels.com and save it to cloudinary.com.`})
  @ApiResponse({
    status: 200,
    description: 'List of random image(s)'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request'
  })
  @ApiQuery({
    name: 'limit',
    type: LimitImageDTO,
    description: 'number of image(s) to request'
  })
  // @ApiQuery({type: LimitImageDTO})
  async getImages(
    @GetCurrentUserDecorator('sub') userId: number,
    @Query('limit', ParseIntPipe) limit: number=this.min_limit
  ): Promise<any>{
    const allowed_limit = limit >= this.max_limit ? this.max_limit : limit;
    return await this.imageService.getImages(allowed_limit, userId);
  }

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file'))
  // uploadImage(@UploadedFile() file: Express.Multer.File){
  //   this.cloudinaryService.uploadFile(file);
  // }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: `Requesting a single image by id.`})
  @ApiResponse({
    status: 200,
    description: 'image details'
  })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'id of the image to retrieve'
  })
  async getImageById(
    @GetCurrentUserDecorator('sub') userId: number,
    @Param('id', ParseIntPipe) id: number
  ): Promise<SingleImageType>{
    return await this.imageService.getImageById(id, userId);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: `Updating an image by id.`})
  @ApiResponse({
    status: 200,
    description: 'image details'
  })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'id of the image to update'
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        hits: {
          type: 'integer',
          example: 13,
          description: 'new hits value'
        },
        uri: {
          type: 'url',
          example: 'https://ehrlich.ph/wp-content/uploads/2022/04/erlc-sitelogo.png',
          description: 'new uri value'        } 
      }
    }    
  })
  async patchImage(
    @GetCurrentUserDecorator('sub') userId: number,
    @Param('id', ParseIntPipe) imageId: number,
    @Body() dto: PatchImageDto
  ): Promise<boolean>{
    return await this.imageService.patchImage(new PatchServiceImageDto(imageId, userId, dto.hits, dto.uri));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({summary: `Creating an image.`})
  @ApiResponse({
    status: 201,
    description: 'successfully created a new image'
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        uri: {
          type: 'url',
          example: 'https://ehrlich.ph/wp-content/uploads/2022/04/erlc-sitelogo.png',
          description: 'uri of the image'        
        },
        owner: {
          type: 'integer',
          example: 1,
          description: `owner's id (user id)`
        } 
      }
    }    
  })
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
  @ApiOperation({summary: `Deleting an image.`})
  @ApiResponse({
    status: 200,
    description: 'image deleted'
  })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'id of the image to delete'
  })
  async deleteImage(
    @GetCurrentUserDecorator('sub') userId: number, 
    @Param('id', ParseIntPipe) imageId: number
  ): Promise<boolean>{
    return this.imageService.deleteImage(imageId, userId);
  }
}
