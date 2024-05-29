import {  ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class JwtRefreshAccessTokenGuard extends AuthGuard('jwt-refresh-access-token') implements IAuthGuard {
  private readonly logger = new Logger(JwtRefreshAccessTokenGuard.name)

  override canActivate(
    context: ExecutionContext
  ){
    this.logger.debug(`canActivate`);    
    return super.canActivate(context);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override handleRequest(err: unknown, user: User): any {
    this.logger.debug(`handleRequest`);
    console.log(user);
    if (err || !user) {
      console.log(err);
      console.log(user);
      throw err || new UnauthorizedException();
    }
    this.logger.debug(`handleRequest.user authentincated`);
    return user;
  }
}
