import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../auth/user.service';
import { ToastrService } from 'ngx-toastr';
import { ExperiencesService } from '../experiences/experiences.service';
import { PlacesService } from '../places/places.service';

export const ownerGuard: CanActivateFn = (route, state) => {
  let ownerId : string | undefined = '';
  if(state.url.startsWith('/experience')) {
    ownerId = inject(ExperiencesService).experience?.ownerId;
  }
  if(state.url.startsWith('/place')) {
    ownerId = inject(PlacesService).place?.ownerId;
  }
  const userId = inject(UserService).user?._id;
    
  if(ownerId == userId) {
    return true;
  }
  const router = inject(Router);
  const toastr = inject(ToastrService);
  toastr.error('Access Denied', 'Error');
  return router.navigate(['/home']);
};
