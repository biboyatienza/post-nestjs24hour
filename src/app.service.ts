import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '24.May.2022 0727 - Nest.js X Heroku';
  }
}
