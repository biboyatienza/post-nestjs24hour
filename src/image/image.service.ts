import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, tap } from 'rxjs';
import { PexelsImageDto } from './dtos';

@Injectable()
export class ImageService {
  private MAX_PAGE: number = 15;


  constructor(private readonly httpService:HttpService){}

  private getRandomNumber(max_number: number): number{
    return Math.floor(Math.random() * max_number);
  } 

  private async getPexelsImages(page_number: number, number_of_image_per_page: number): Promise<any>{
    const uri = `https://api.pexels.com/v1/search?query=people&page=${page_number}&per_page=${number_of_image_per_page}`;
    const token = '563492ad6f9170000100000143b1404b9f7e475d8c8831687a2e36a9';
    
    return this.httpService
      .get<PexelsImageDto[]>(uri, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .pipe(
        map((response) => response.data),
        tap((data) => console.log(data))
      ); 
  }

  async getImages(limit: number): Promise<any>{
    const pageNumber = this.getRandomNumber(this.MAX_PAGE);
    return await this.getPexelsImages(pageNumber, limit);
  }
}