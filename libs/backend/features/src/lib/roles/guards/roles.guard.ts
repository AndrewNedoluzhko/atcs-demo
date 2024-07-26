import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from '@mtfs/shared/enums';
import { User } from '../../users/entities/user.entity';

import { ROLES_KEY } from '@mtfs/backend/utils';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean  {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if(!requiredRoles){
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request?.user as User;
    return requiredRoles.some((role) => user.role?.name === role);
  }
}