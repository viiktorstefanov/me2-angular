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
  private user$ = this.$$user.asObservable();

  user: User | undefined;
  subscription: Subscription;

  USER_KEY = environment.USER_KEY;
  

  get isLogged() : boolean {
    return !!this.user;
  };

  isOwner(ownerId: string | undefined) : boolean | undefined {
    return !!(this.user?._id === ownerId);
  }

  get getUserInfo() : User | undefined {
    return this.user;
  };

  constructor(private http: HttpClient) {
    const storedUser = sessionStorage.getItem(this.USER_KEY);

    
    if(storedUser) {    
      this.$$user.next(JSON.parse(storedUser));
    }
    

    this.subscription = this.user$.subscribe((user) => {
      this.user = user;
    })
  };

  login(email: string, password: string) : Observable<any>{
    return this.http.post<User>('/api/users/login', { email, password });
    //.pipe(tap((user) => this.$$user.next(user)))
  };

  register(firstName: string, lastName: string, email: string, password: string, phoneNumber: string) : Observable<any>{
    return this.http.post<User>('/api/users/register', { firstName, lastName, email, password, phoneNumber });
    //.pipe(tap((user) => this.$$user.next(user)))
  };

  logout() {
   return this.http.get('/api/users/logout').pipe(tap(() => this.$$user.next(undefined)));
  };

  updateUser(user: User | any) { 
    this.$$user.next(user);

    sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  };

  clearUser() {
    sessionStorage.removeItem(this.USER_KEY);
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  };
}
