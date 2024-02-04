import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../auth/user.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../auth/login/login.component';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  if(inject(UserService).isLogged) {
    return true;
  }
  inject(MatDialog).open(LoginComponent);
  const router = inject(Router);
  const toastr = inject(ToastrService);
  toastr.error('Access Denied: Please sign in to access this page.', 'Error');
  return router.navigate(['/home']);
};
