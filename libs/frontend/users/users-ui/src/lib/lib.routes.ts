import { Route } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { authGuard } from '@mtfs/frontend/auth-guards';
import { RoleEnum } from '@mtfs/shared/enums';

export const usersUiRoutes: Route[] = [

  { 
    path: '', component: UsersComponent, 
    canActivate: [authGuard],
    data: {userRole: [RoleEnum.Admin]}
  },
];
