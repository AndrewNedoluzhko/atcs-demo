import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '@mtfs/shared/domain';
import { Observable } from 'rxjs';

const usersApi = `/users`;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {  }

  getAll(): Observable<IUser[]>{
    return this.http.get<IUser[]>(usersApi);
  }
}
