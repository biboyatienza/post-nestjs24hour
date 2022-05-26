import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { TokenType } from './types';
import { JwtService } from '@nestjs/jwt';
import { EmailUserDto, NewPasswordUserDto, RegisterUserDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { User } from '@prisma/client';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService
    ){}

  async register(dto: RegisterUserDto): Promise<TokenType>{
    const userExists = await this.findUserByEmail(dto.email);
    if(userExists) throw new ForbiddenException('Email already registed.');

    const passwordHash = await this.hashData(dto.password);
    const newUser = await this.prismaService.user.create({
      data: {
        email: dto.email,
        passwordHash: passwordHash
      }
    }).catch((error) => {
      if(error instanceof PrismaClientKnownRequestError){
        if(error.code === 'P202'){
          throw new ForbiddenException("Credential incorrect")
        }
      }
      throw error;
    });

    return await this.getSignedToken(newUser.id, newUser.email);
  }
  
  async login(dto: LoginUserDto): Promise<TokenType>{
    const user = await this.findUserByEmail(dto.email);
    if(!user) throw new ForbiddenException('Access Denied.');

    const passwordMatches = await bcrypt.compare(dto.password, user.passwordHash);
    if(!passwordMatches) throw new ForbiddenException('Access Denied');

    return await this.getSignedToken(user.id, user.email);
  }
  
  async passwordReset(dto: EmailUserDto): Promise<boolean>{
    const user = await this.findUserByEmail(dto.email);
    if(!user) throw new ForbiddenException('Email does not exists.');

    const hashPasswordResetToken = await this.hashData(user.passwordHash);
    await this.prismaService.user.updateMany({
      where: {
        id: user.id
      },
      data: {
        passwordResetToken: hashPasswordResetToken,
        updatedAt: new Date()
      },
    });

    // Email sending:  passwordResetToken

    return true;
  }

  async passwordNew(dto: NewPasswordUserDto): Promise<TokenType>{
    const userFound = await this.prismaService.user.findFirst({
      where: {
        passwordResetToken : dto.password_reset_token
      }
    });
    if (!userFound) throw new ForbiddenException('Invalid password reset token.');

    const hashNewPassword = await this.hashData(dto.new_password); 

    await this.prismaService.user.updateMany({
      where: {
        id: userFound.id
      },
      data: {
        passwordHash: hashNewPassword,
        passwordResetToken: null,
        updatedAt: new Date()
      },
    });

    const token = await this.getSignedToken(userFound.id, userFound.email);
    return token;
  }


  private async hashData(data: string){
    return await bcrypt.hash(data, 10);
  }

  private async getSignedToken(userId: number, email: string): Promise<TokenType>{
    const accessToken = await this.jwtService.signAsync(
      {
        sub: userId,
        email
      },
      {
        secret: process.env.TOKEN_SECRET,
        expiresIn: 60 * Number(process.env.TOKEN_EXPIRES_IN_MINUTES)
      }
    );

    return {
      access_token: accessToken
    };
  }

  private async findUserByEmail(email: string): Promise<User>{
    return await this.prismaService.user.findUnique({
      where: {
        email
      }
    });
  }

}
