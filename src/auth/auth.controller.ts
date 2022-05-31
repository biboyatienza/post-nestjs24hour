import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiOperation({summary: `Register a new user.`})
  @ApiResponse({
    status: 201,
    description: 'Registered a new user'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request'
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'email',
          example: 'your_email@emai.com',
          description: 'valid email to register'
        },
        password: {
          type: 'string',
          example: 'P@ssw0rd1234!@#',
          description: 'a strong password'        
        },
        role: {
          type: 'role',
          example: 'USER',
          description: 'a user role (RBAC)'        
        }
      }
    }    
  })
  async register(@Body() dto: RegisterUserDto): Promise<TokenType>{
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: `User login.`})
  @ApiResponse({
    status: 200,
    description: 'Registered user login'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request'
  })

  @ApiResponse({
    status: 403,
    description: 'Unauthorized'
  })

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'email',
          example: 'your_email@emai.com',
          description: 'valid email to register'
        },
        password: {
          type: 'string',
          example: 'P@ssw0rd1234!@#',
          description: 'a strong password'        
        }
      }
    }    
  })
  login(@Body() dto: LoginUserDto): Promise<TokenType>{
    return this.authService.login(dto);
  }

  @Post('password-reset')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: `User password reset request.`})
  @ApiResponse({
    status: 200,
    description: 'Password reset request successfull'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request'
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden'
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'email',
          example: 'your_email@emai.com',
          description: 'valid email to register'
        }
      }
    }    
  })
  passwordReset(@Body() dto: EmailUserDto): Promise<any>{
    return this.authService.passwordReset(dto);
  }

  @Post('password-new')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: `User's new password.`})
  @ApiResponse({
    status: 200,
    description: 'New password applied'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request'
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden'
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        password_reset_token: {
          type: 'string',
          example: 'y$2b$10$8EAeebZxIaLZEUdLyQX2/eLU9/ffxy.TE91OtlB93IefjOP5PTO12our_email@emai.com',
          description: `a valid 'password reset token'`
        },
        new_password: {
          type: 'string',
          example: 'V3rY5t0N6Pasword12345qwert',
          description: `a new strong password'`
        } 
      }
    }    
  })
  passwordNew(@Body() dto: NewPasswordUserDto): Promise<TokenType>{
    return this.authService.passwordNew(dto);
  }
}
