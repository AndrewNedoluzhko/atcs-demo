import { Route } from '@angular/router';
import { authGuard } from '@mtfs/frontend/auth-guards';
import { RoleEnum } from '@mtfs/shared/enums';

export const appRoutes: Route[] = [
  {
    path: 'auth',
     loadChildren: () =>  import('@mtfs/frontend/auth-ui').then((auth) => auth.authRoutes),

  }, 
    //----------path for admin role------------// 
  {
    path: '',
    async loadComponent() {
      const c = await import('@mtfs/frontend/ui-components');
      return c.HomeComponent
    },
    canActivate: [authGuard],   
    children: [
      {
        path: 'users',
        async loadComponent() {
          const c = await import('@mtfs/frontend/users-ui');
          return c.UsersComponent;
        },
        canActivate: [authGuard],
        data: {userRole: RoleEnum.Admin} 
      },
    ]  
  },
    //----------path for user role------------//
  {
    path: '',
    async loadComponent() {
      const c = await import('@mtfs/frontend/ui-components');
      return c.HomeComponent
    },
    canActivate: [authGuard], 

  },
  //----------Error Pages------------//
  {
    path: '403',
    async loadComponent(){
      const c = await import('@mtfs/frontend/error-pages');
      return c.ForbiddenComponent;      
    }      
  },

  {
    path: 'server-error',
    async loadComponent(){
      const c = await import('@mtfs/frontend/error-pages');
      return c.ServerErrorComponent
    }
  },
  {
    path: '**',
    async loadComponent(){
      const c = await import('@mtfs/frontend/error-pages');
      return c.NotFoundComponent
    }
  }
];
