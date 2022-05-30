import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, map, Observable, of } from 'rxjs';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Pexel } from './interfaces';
import { GetImagesInfoType, GetImagesType } from './types';

@Injectable()
export class ImageService {
  private MAX_PAGE: number = 15;

  constructor(
    private readonly httpService: HttpService,
    private readonly cloudinaryService: CloudinaryService
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


  async getImages(limit: number): Promise<any>{
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
        imageData.id = 0;
        imageDatos.push(imageData);  
        // Save to db:

      } catch (error) {
        console.log(error);
      }
    }
    getImagesType.data = imageDatos;
    return getImagesType;    
  }
}