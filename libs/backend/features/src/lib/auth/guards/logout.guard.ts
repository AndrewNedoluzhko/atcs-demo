import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { User } from '../../users/entities/user.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class LogoutGuard extends AuthGuard('jwt-refresh-access-token') implements IAuthGuard {
  constructor(
    private authService: AuthService
  ) {
    super();
  }
  private readonly logger = new Logger(LogoutGuard.name)

  override canActivate(
    context: ExecutionContext
  ){
    this.logger.debug(`${LogoutGuard.name} canActivate`);  
    return super.canActivate(context);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
   override handleRequest(err: unknown, user: User): any {
    this.logger.debug(`${LogoutGuard.name} handleRequest`);  
    if (err || !user) {
      console.log(err);
      console.log(user);
      throw err || new UnauthorizedException();
    }else {
      this.logger.debug(`${LogoutGuard.name} removeCurrentRefreshToken`); 
      console.log('LOGOUT_GUARD')
      this.authService.removeCurrentRefreshToken(user.id);
    }  
    return user;
  }
}
