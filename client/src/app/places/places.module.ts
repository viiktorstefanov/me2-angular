import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlacesListComponent } from './places-list/places-list.component';
import { PlacesRoutingModule } from './places-routing.module';
import { PlacesDetailsComponent } from './places-details/places-details.component';
import { SharedModule } from '../shared/shared.module';
import { PlacesAddComponent } from './places-add/places-add.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { ReactiveFormsModule } from '@angular/forms';
import { PlacesEditComponent } from './places-edit/places-edit.component';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [
    PlacesListComponent,
    PlacesDetailsComponent,
    PlacesAddComponent,
    PlacesEditComponent
  ],
  imports: [
    CommonModule,
    PlacesRoutingModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    TextFieldModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ],
  exports: [
    PlacesListComponent
  ]
})
export class PlacesModule { }
