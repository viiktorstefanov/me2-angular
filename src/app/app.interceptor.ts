import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { EMPTY, Observable, catchError, finalize, tap, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { UserService } from './auth/user.service';
import { User } from './auth/types/User';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

const { apiUrl } = environment;

@Injectable()
export class AppInterCeptor implements HttpInterceptor {

  errors: string[] = [];

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    
    
    if (req.url.startsWith('/api')) {
      req = req.clone({
        url: req.url.replace('/api', apiUrl),
      });
    }
    
    const userData: User | undefined = this.userService.userInfo;
    
    if (userData) {
      req = req.clone({
      setHeaders: {
        'M-Authorization': JSON.stringify(userData.accessToken),
        'user' : JSON.stringify(userData),
      }
      });
    }

    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (
          event instanceof HttpResponse &&
          req.url.startsWith(apiUrl)
        ) {
          
          const body = event.body;
          if (body && body.email) {
            this.userService.updateUser(body);
          }
        }
      }),
      catchError((err) => {
        if (err.status === 401) {
          this.userService.clearUser();
          this.router.navigate(['auth/login']);
          this.errors = [];
          this.errors.push(err.error.message);
          this.errors.forEach(error => this.toastr.error(error, 'Error'));  
          return EMPTY;
        }

        if (err.status === 404 && req.url.includes('user-collection')) {
          this.router.navigate(['not-found']);
          this.errors = [];
          this.errors.push(err.error.message);
          this.errors.forEach(error => this.toastr.error(error, 'Error'));  
          return EMPTY;
        }

        return throwError(() => err);
      })
    );
  }
}

export const appInterceptorProvider: Provider = {
  multi: true,
  useClass: AppInterCeptor,
  provide: HTTP_INTERCEPTORS,
};