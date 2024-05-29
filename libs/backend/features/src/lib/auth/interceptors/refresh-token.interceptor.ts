import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';
import parse from 'parse-duration';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class RefreshTokenInterceptor implements NestInterceptor {
  private readonly logger = new Logger(RefreshTokenInterceptor.name)
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,    
  ){}
  intercept(
    context: ExecutionContext,
    next: CallHandler<User>): Observable<User> {
    return next.handle().pipe(      
      map(user => {        
        const response = context.switchToHttp().getResponse<Response>();
        const refreshTokenExpiresIn = parse(this.configService.get('JWT_REFRESH_TOKEN_EXPIRES_IN') as string);
        const refreshTokenSecret = `${parse(this.configService.get('JWT_REFRESH_TOKEN_SECRET') as string)}`;
        const refreshTokenOptions = { expiresIn: `${refreshTokenExpiresIn}`, secret: refreshTokenSecret };
        const refreshToken = this.authService.signToken(user, refreshTokenOptions);
        response.cookie("Refresh", refreshToken, {
          httpOnly: true,
          maxAge: refreshTokenExpiresIn
        });     

        this.authService.setCurrentRefreshToken(user.id, refreshToken);
        return user;
      })
    )
  }
}
