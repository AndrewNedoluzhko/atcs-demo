import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class ClearCookiesInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<User>): Observable<User> {
    return next.handle().pipe(
      map(result => {
        const response = context.switchToHttp().getResponse<Response>();
        response.clearCookie("Authentication");
        response.clearCookie("Refresh");
        return result;
      })
    )
  }
}
