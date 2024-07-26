import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '@mtfs/frontend/auth-service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot ) => {
    console.log('AUTHGUARD');
    const router: Router = inject(Router);
    const authService: AuthService = inject(AuthService);
    const user = authService.userValue; 
    console.log (user);  
    // check user
    if (user) {     
      let allowedRouteRoles = route.data?.['userRole'];
      // if allowedRouteRoles is undefined or empty, allow access
      if (!allowedRouteRoles) {
        return true;
      }
      // cast allowedRouteRoles to an array if it is a string
      if (!Array.isArray(allowedRouteRoles)) {
        allowedRouteRoles = [allowedRouteRoles];
      }
      console.log(allowedRouteRoles);

      // Checking if the user's role is in the list of allowed roles
      if (!allowedRouteRoles.some((roleName: string) => user.role?.name.includes(roleName))) {        
        console.log("authGuard. Forbidden");
        // forbidden access
        router.navigate(['/403']);  
        return false;        
      }      
      // allowed acces
      return true;       
    } else {
      // user is not authentificated      
      router.navigate(['/auth/login'], {queryParams: {returnUrl: state.url}});
      console.log("authGuard. not user");
      return false;
    }
};
