import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlacesListComponent } from './places-list/places-list.component';
import { PlacesRoutingModule } from './places-routing.module';
import { PlacesDetailsComponent } from './places-details/places-details.component';



@NgModule({
  declarations: [
    PlacesListComponent,
    PlacesDetailsComponent
  ],
  imports: [
    CommonModule,
    PlacesRoutingModule
  ],
  exports: [
    PlacesListComponent
  ]
})
export class PlacesModule { }
