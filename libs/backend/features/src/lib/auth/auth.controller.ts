import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UseGuards,
  HttpCode,
  HttpStatus,
  Logger
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AccessTokenInterceptor } from './interceptors/access-token.interceptor';
import { RefreshTokenInterceptor } from './interceptors/refresh-token.interceptor';
import { User } from '../users/entities/user.entity';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from '@mtfs/backend/utils';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtRefreshAccessTokenGuard } from './guards/jwt-refresh-access-token.guard';
import { ClearCookiesInterceptor } from './interceptors/clear-cookies.interceptor';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name)
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, type: User, description: 'User successfully registered' })
  @UseInterceptors(AccessTokenInterceptor, RefreshTokenInterceptor)
  create(@Body() createAuthDto: CreateAuthDto) {
    this.logger.debug(`register`);
    return this.authService.register(createAuthDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Log in and obtain access and refresh tokens' })
  @ApiResponse({ status: 200, type: User, description: 'Login successful' })
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(AccessTokenInterceptor, RefreshTokenInterceptor)
  async login(    
    @CurrentUser() user: User
  ) {
    return user;
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard) 
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, type: User, description: 'User profile retrieved successfully' }) 
  getProfile(@CurrentUser() user: User) {
    return user;
  }

  @Post('refresh')  
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({ status: 200, type: User, description: 'Access token refreshed successfully' })
  @UseGuards(JwtRefreshAccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(AccessTokenInterceptor)
  async refreshAccessToken(@CurrentUser() user: User) {
    return user;
  }

  @Get('logout')
  @ApiOperation({ summary: 'Log out and remove refresh token' })
  @ApiResponse({ status: 200, description: 'Logout successful' })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClearCookiesInterceptor)
  async logout(@CurrentUser() user: User) {
    if (user) {
      this.authService.removeCurrentRefreshToken(user.id);
    }
    return { succes: true };
  }
}
