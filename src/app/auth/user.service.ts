import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './types/User';
import { endpoints } from './endpoints/Endpoints';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(userData: User) {
    return this.http.post(endpoints.register, userData)
  }

  logout(): Observable<any> {
    console.log('logouted');
    return new Observable<User>;
  }
}
