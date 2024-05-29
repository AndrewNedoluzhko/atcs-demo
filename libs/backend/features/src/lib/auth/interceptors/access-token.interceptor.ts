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
export class AccessTokenInterceptor implements NestInterceptor {
  private readonly logger = new Logger(AccessTokenInterceptor.name)
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
        const accessTokenExpiresIn = parse(this.configService.get('JWT_ACCESS_TOKEN_EXPIRES_IN') as string);
        const accessTokenSecret = `${parse(this.configService.get('JWT_ACCESS_TOKEN_SECRET')as string)}`;
        const accessTokenOptions = {expiresIn: `${accessTokenExpiresIn}`, secret: accessTokenSecret};
        const accessToken = this.authService.signToken(user, accessTokenOptions);

        this.logger.debug(`intercept -> map`)
        response.cookie("Authentication", accessToken, {
          httpOnly: true,
          maxAge: accessTokenExpiresIn
        });
        return user;
      })
    );
  }
}

