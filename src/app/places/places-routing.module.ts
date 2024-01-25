import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlacesListComponent } from './places-list/places-list.component';
import { PlacesDetailsComponent } from './places-details/places-details.component';

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
            path: ':placeId',
            component: PlacesDetailsComponent,
            title: 'Place details'
        }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlacesRoutingModule { }
