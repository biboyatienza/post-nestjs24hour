import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { SendgridService } from './sendgrid/sendgrid.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { ImageService } from './image/image.service';
import { ImageController } from './image/image.controller';

@Module({
  imports: [HttpModule, CloudinaryModule, PrismaModule, AuthModule, EventEmitterModule.forRoot()],
  controllers: [AppController, ImageController],
  providers: [AppService, SendgridService, CloudinaryService, ImageService],
})
export class AppModule {}
