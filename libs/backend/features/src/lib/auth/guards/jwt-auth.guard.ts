import {  ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';

import { User } from '../../users/entities/user.entity';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt')  implements IAuthGuard {

  private readonly logger = new Logger(JwtAuthGuard.name)
  override canActivate(context: ExecutionContext) {
    
    return super.canActivate(context);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override handleRequest(err: unknown, user: User): any {
    if (err || !user) {      
      console.log(err);
      console.log(user);
      throw err || new UnauthorizedException();
    }
    return user;
  }
}


