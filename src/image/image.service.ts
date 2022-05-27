import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { PexelsImageDto } from './dto';
import { Pexel } from './interfaces';

@Injectable()
export class ImageService {
  private MAX_PAGE: number = 15;

  constructor(private readonly httpService: HttpService){}

  private getRandomNumber(max_number: number): number{
    return Math.floor(Math.random() * max_number);
  } 

  private async getPexelsImages(page_number: number, number_of_image_per_page: number): Promise<Observable<Pexel>>{
    const uri = `https://api.pexels.com/v1/search?query=people&page=${page_number}&per_page=${number_of_image_per_page}`;
    const token = '563492ad6f9170000100000143b1404b9f7e475d8c8831687a2e36a9';
    
    return this.httpService      
      .get(uri, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .pipe(
        map((response) => response.data),
      ); 
  }

  async getImages(limit: number): Promise<any>{
    const pageNumber = this.getRandomNumber(this.MAX_PAGE);
    const pexel = await (await this.getPexelsImages(pageNumber, limit));
    const photos = pexel.pipe(map((pexel) => pexel.photos));
    photos.forEach(photo => {
      console.log(photo.map(p => p.url));
    });
    
    return photos;    
  }
}