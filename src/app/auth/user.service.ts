import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { User } from './types/User';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy{
  private $$user = new BehaviorSubject<User | undefined>(undefined); 
  public user$ = this.$$user.asObservable();

  user: User | undefined;
  USER_KEY = environment.USER_KEY;
  

  get isLogged() : boolean {
    return !!this.user;
  }

  subscription: Subscription;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem(this.USER_KEY);

    
    if(storedUser) {
      console.log(JSON.parse(storedUser));
      
      this.$$user.next(JSON.parse(storedUser));
    }
    

    this.subscription = this.user$.subscribe((user) => {
      this.user = user;
    })
  };

  login(email: string, password: string) : Observable<any>{
    return this.http.post<User>('/api/users/login', { email, password }).pipe(tap((user) => this.$$user.next(user)));
  };

  register(firstName: string, lastName: string, email: string, password: string, phoneNumber: string) : Observable<any>{
    return this.http.post<User>('/api/users/register', { firstName, lastName, email, password, phoneNumber }).pipe(tap((user) => this.$$user.next(user)));;
  };

  logout() {
   return this.http.get('/api/users/logout').pipe(tap(() => this.$$user.next(undefined)));
  };

  get userInfo() : User | undefined {
    return this.user;
  };

  updateUser(user: User | any) { 
    this.$$user.next(user);

    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  };

  clearUser() {
    localStorage.removeItem(this.USER_KEY);
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  };
}
