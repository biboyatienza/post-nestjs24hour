import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageService } from './image/image.service';
import { ImageController } from './image/image.controller';
import { HttpModule } from '@nestjs/axios';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [HttpModule, CloudinaryModule, PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, ImageService],
})
export class AppModule {}
