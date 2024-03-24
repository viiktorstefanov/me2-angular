import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperiencesListComponent } from './experiences-list/experiences-list.component';
import { ExperiencesRoutingModule } from './experiences-routing.module';
import { ExperiencesDetailsComponent } from './experiences-details/experiences-details.component';
import { SharedModule } from '../shared/shared.module';
import { ExperiencesAddComponent } from './experiences-add/experiences-add.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { ReactiveFormsModule } from '@angular/forms';
import { ExperiencesEditComponent } from './experiences-edit/experiences-edit.component';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [
    ExperiencesListComponent,
    ExperiencesDetailsComponent,
    ExperiencesAddComponent,
    ExperiencesEditComponent
  ],
  imports: [
    CommonModule,
    ExperiencesRoutingModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    TextFieldModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ],
  exports: [
    ExperiencesListComponent,
  ]
})
export class ExperiencesModule { }
