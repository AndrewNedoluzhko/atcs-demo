import { Route } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';


export const authRoutes: Route[] = [
  {
    path: '', redirectTo: '/auth/login', pathMatch: 'full'
  },
  {
     path: 'register', component: RegisterComponent 
  },
  {
    path: 'login', component: LoginComponent 
  },
];
