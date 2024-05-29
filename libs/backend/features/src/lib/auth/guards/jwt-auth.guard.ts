import {  ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';

import { User } from '../../users/entities/user.entity';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt')  implements IAuthGuard {

  private readonly logger = new Logger(JwtAuthGuard.name)
  override canActivate(context: ExecutionContext) {
    this.logger.debug(`canActivate`);
    
    return super.canActivate(context);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override handleRequest(err: unknown, user: User): any {
    this.logger.debug(`handleRequest`);
    if (err || !user) {      
      this.logger.debug(`handleRequest.error`);
      console.log(err);
      console.log(user);
      throw err || new UnauthorizedException();
    }
    this.logger.debug(`handleRequest.user authentincated`);
    return user;
  }
}


