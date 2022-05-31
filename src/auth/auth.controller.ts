import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { EmailUserDto, NewPasswordUserDto, RegisterUserDto } from './dto';
import { LoginUserDto } from './dto/login-user.dto';
import { TokenType } from './types';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService){}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterUserDto): Promise<TokenType>{
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginUserDto): Promise<TokenType>{
    return this.authService.login(dto);
  }

  @Post('password-reset')
  @HttpCode(HttpStatus.OK)
  passwordReset(@Body() dto: EmailUserDto): Promise<any>{
    return this.authService.passwordReset(dto);
  }

  @Post('password-new')
  @HttpCode(HttpStatus.OK)
  passwordNew(@Body() dto: NewPasswordUserDto): Promise<TokenType>{
    return this.authService.passwordNew(dto);
  }
}
