import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '<h2>24.May.2022 0727 - Nest.js X Heroku</h2><br/><p><strong>OpenAPI/Swagger now available on /api</strong></>';
  }
}
