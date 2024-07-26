import { HttpErrorResponse, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '@mtfs/frontend/auth-service';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let isRefreshing = false;
  const router: Router = inject(Router)
  const authService: AuthService = inject(AuthService);
  console.log('AUTHINTERCEPTOR');
  req = req.clone({
    withCredentials: true,
  });
  console.log(req);
  
  if((req.url.toLowerCase().includes('/login')) ||
    (req.url.toLowerCase().includes('/logout')) ||
    (req.url.toLowerCase().includes('/register')) ||
    (req.url.toLowerCase().includes('/refresh')))
    {  
      console.log('authInterceptor. skip interception');
      return next(req);
    } else {
      return next(req).pipe(
        
        catchError((error: HttpErrorResponse) => {
          console.log('authInterceptor. start to check error');
          if(error && error.status === 401 ){
            console.log('authInterceptor. interception 401 unauthorized');
            //401 Unauthorized
            if(!isRefreshing){
              console.log('authInterceptor. interception 401 unauthorized. refreshing = true');
              isRefreshing = true;
              const user = authService.userValue;
              if(user){
                console.log('authInterceptor. interception 401 unauthorized. try to refresh token');
                //try to refresh token
                return authService.refresh().pipe(                  
                  switchMap(() => {
                    console.log('authInterceptor. interception 401 unauthorized. refresh token');
                    isRefreshing= false;
                    return next(req);
                  }),
                  catchError((originalError)=> {
                    console.log('authInterceptor. interception 401 unauthorized. logout');
                    console.log('Original Error');
                    console.log(originalError);
                    isRefreshing= false;
                    authService.logout()
                    .subscribe({
                      error: (error) => {
                        return throwError(() => error);
                      }
                    });
                    router.navigate(['auth/login']);   
                    return throwError(() => originalError);
                  })
                )                
              } else {
                console.log('authInterceptor. interception 401 unauthorized. logout');
                isRefreshing = false;
                return next(req)
              }
            } else {
              return next(req)
            }
          } else if(error.status === 403){
            //403 - Forbidden - move to access denied page
            router.navigate(['/403']);
            return throwError(() => error);
          } else {
            //some another server error, move to server error page
            router.navigate(['server-error']);
            return throwError(() => error);
          }
        })
      ) as Observable<HttpEvent<unknown>>;
    }
    
  
};
