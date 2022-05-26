import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageService } from './image/image.service';
import { HttpModule } from '@nestjs/axios';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { SendgridService } from './sendgrid/sendgrid.service';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [HttpModule, CloudinaryModule, PrismaModule, AuthModule, EventEmitterModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, ImageService, SendgridService],
})
export class AppModule {}
