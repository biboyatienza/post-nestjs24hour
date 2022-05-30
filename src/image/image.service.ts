import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Image } from '@prisma/client';
import { firstValueFrom, map, Observable, of } from 'rxjs';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PatchServiceImageDto, PostImageDto, PostServiceImageDto } from './dto';
import { Pexel } from './interfaces';
import { GetImagesInfoType, GetImagesType, SingleImageType } from './types';

@Injectable()
export class ImageService {
  private MAX_PAGE: number = 15;

  constructor(
    private readonly httpService: HttpService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly prismaService: PrismaService
  ){}

  private getRandomNumber(max_number: number): number{
    return Math.floor(Math.random() * max_number);
  } 

  private async getPexelsImages(page_number: number, number_of_image_per_page: number){
    const uri = `https://api.pexels.com/v1/search?query=people&page=${page_number}&per_page=${number_of_image_per_page}`;
    const token = process.env.PEXELS_TOKEN;
      return await firstValueFrom(this.httpService.get(uri, {
        headers: {
          "Authorization": `Bearer ${token}`
        }})
      );
    }

  private async getUserRole(userId: number): Promise<string>{
    const currentUser = await this.prismaService.user.findFirst({
      where: {id: userId}    
    });
    console.log('currentUser.role', currentUser.role);
    return currentUser.role === 'ADMIN' ? 'ADMIN' : 'USER'; 
  }  

  private async findImageByIdAndUserId (imageId: number, userId: number): Promise<Image> {
    const role = await this.getUserRole(userId);

    console.log('role:', role );
    console.log('userId:', userId );

    if(role==='ADMIN')
      return await this.prismaService.image.findFirst({
        where: {
            id: imageId
        }
      });
      
    return await this.prismaService.image.findFirst({
      where: {
        AND: [
          { id: imageId },
          { creatorId: userId },
          { softDeletedAt: null }
        ] 
      }
    });

  }  

  async getImages(limit: number, userId: number): Promise<GetImagesType>{
    const pageNumber = this.getRandomNumber(this.MAX_PAGE);
    const pexel = await this.getPexelsImages(pageNumber, limit);
    const pxlData: Pexel = pexel.data;

    var getImagesType: GetImagesType = new GetImagesType();
    getImagesType.limit = limit;
    var imageDatos: Array<GetImagesInfoType> = [];

    for(let p of pxlData.photos){
      try {
        const cloudinaryResponse = await this.cloudinaryService.uploadUrl(p.src.original);
        var imageData = new GetImagesInfoType();
        imageData.hits = 1;
        imageData.uri = await cloudinaryResponse.secure_url;
        imageData.id = (await this.createImage(userId,imageData.uri)).id;
        imageDatos.push(imageData);  
      } catch (error) {
        console.log(error);
      }
    }
    getImagesType.data = imageDatos;
    return getImagesType;    
  }

  async getImageById(imageId: number, userId: number): Promise<SingleImageType>{
    const imageExists = await this.findImageByIdAndUserId(imageId, userId);
    if(!imageExists) throw new ForbiddenException('Image not exists.');

    imageExists.hits++;
    await this.prismaService.image.updateMany({
      where: {
        id: imageId
      },
      data: {
        hits: imageExists.hits
      },
    });

    return {
      id: imageExists.id,
      hits: imageExists.hits,
      uri: imageExists.uri
    };
  }

  async patchImage(dto: PatchServiceImageDto): Promise<boolean>{
    const imageExists = await this.findImageByIdAndUserId(dto.imageId, dto.userdId);
    if(!imageExists) throw new ForbiddenException ('Image not exists.');

    await this.prismaService.image.updateMany({
      where: {
        id: dto.imageId
      },
      data: {
        hits: dto.hits,
        uri: dto.uri
      },
    });

    return true;
  }

  async postImage(dto: PostServiceImageDto): Promise<boolean>{
    const userExists = await this.prismaService.user.findFirst({
      where: {
        id: dto.owner
      }
    });
    if(!userExists) throw new ForbiddenException ('Owner not exists.');
    await this.createImage(dto.owner, dto.uri);
    return true;
  }

  async deleteImage(imageId: number, userdId: number): Promise<boolean>{
    const imageExists = await this.findImageByIdAndUserId(imageId, userdId);
    if(!imageExists) throw new ForbiddenException ('Image not exists.');

    await this.prismaService.image.updateMany({
      where: {
        id: imageId
      },
      data: {
        softDeletedAt: new Date()
      },
    });

    return true;
  }

  private async createImage(creatorId: number, uri: string): Promise<Image>{
    return await this.prismaService.image.create({
      data: {
        creatorId,
        uri
      }      
    });
  }
}