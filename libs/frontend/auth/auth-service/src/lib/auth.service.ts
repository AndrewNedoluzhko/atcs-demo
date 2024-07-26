import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ICreateUser, ILogin, IUser } from '@mtfs/shared/domain';
import { HttpClient,  } from '@angular/common/http';

const authApi = '/auth'
interface LogoutResponse {
  success: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<IUser | null>;
  private user: Observable<IUser | null>;


  constructor(
    private http: HttpClient
  ) { 
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.userSubject= new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(){
    return this.userSubject.value;
  }

  register(user: ICreateUser) {
    console.log(`frontend.authservice.register`);
    console.log(user);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.http.post<any>(`${authApi}/register`, user, )
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        console.log(`frontend.authservice.registered`);
        console.log(user);
        return user;
      }));
  }

  login(login: ILogin){
    console.log(`frontend.authservice.login`);
    return this.http.post<IUser>(`${authApi}/login`, login)
      .pipe(map(user => {
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        console.log(`frontend.authservice.logged`);
        return user;
      }));
  }

  logout(){
    console.log(`frontend.authservice.logout`);
    this.userSubject.next(null);
    localStorage.removeItem('user');  
    return this.http.get<LogoutResponse>(`${authApi}/logout`);
  }

  refresh() {
    console.log(`authservice.refresh`);
    return this.http.post<IUser>(`${authApi}/refresh`, {})
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }))
  }
}

