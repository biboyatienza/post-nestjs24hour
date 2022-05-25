import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, tap } from 'rxjs';
import { PexelsImageDto } from './dtos';

@Injectable()
export class ImageService {
  constructor(private readonly httpService:HttpService){}

  private async getPexelsImages(limit: number): Promise<any>{
    const uri = 'https://api.pexels.com/v1/search?query=people';
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
    const pexelsImages = await this.getPexelsImages(limit);
    
    // Random?  
    // const getRandomPhotos = pexelsImages => [...photos][Math.floor(Math.random()*limit)];

    return pexelsImages;
  }
}

//const getRandomItem = set => [...set][Math.floor(Math.random()*set.size)]
