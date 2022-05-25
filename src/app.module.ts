import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageService } from './image/image.service';
import { ImageController } from './image/image.controller';
import { HttpModule } from '@nestjs/axios';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [HttpModule, CloudinaryModule],
  controllers: [AppController, ImageController],
  providers: [AppService, ImageService],
})
export class AppModule {}
