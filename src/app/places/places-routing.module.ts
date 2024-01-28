import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlacesListComponent } from './places-list/places-list.component';
import { PlacesDetailsComponent } from './places-details/places-details.component';
import { PlacesAddComponent } from './places-add/places-add.component';
import { PlacesEditComponent } from './places-edit/places-edit.component';

const routes: Routes = [
  {
    path: 'places',
    children: [
        {
            path: '',
            pathMatch: 'full',
            component: PlacesListComponent,
            title: 'Places'
        },
        {
          path: 'add',
          component: PlacesAddComponent,
          title: 'Add place'
        },
        {
          path: 'edit',
          component: PlacesEditComponent,
          title: 'Edit place'
        },
        {
            path: ':placeId',
            component: PlacesDetailsComponent,
            title: 'Place details'
        },
        
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlacesRoutingModule { }
