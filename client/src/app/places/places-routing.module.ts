import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlacesListComponent } from './places-list/places-list.component';
import { PlacesDetailsComponent } from './places-details/places-details.component';
import { PlacesAddComponent } from './places-add/places-add.component';
import { PlacesEditComponent } from './places-edit/places-edit.component';
import { authGuard } from '../guards/auth.guard';
import { ownerGuard } from '../guards/owner.guard';

const routes: Routes = [
        {
            path: '',
            pathMatch: 'full',
            component: PlacesListComponent,
            title: 'Me2: Places'
        },
        {
          path: 'add',
          component: PlacesAddComponent,
          canActivate: [authGuard],
          title: 'Me2: Add'
        },
        {
          path: 'edit/:placeId',
          component: PlacesEditComponent,
          canActivate: [authGuard, ownerGuard],
          title: 'Me2: Edit'
        },
        {
            path: 'details/:placeId',
            component: PlacesDetailsComponent,
            canActivate: [authGuard],
            title: 'Me2: Details'
        },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlacesRoutingModule { }
