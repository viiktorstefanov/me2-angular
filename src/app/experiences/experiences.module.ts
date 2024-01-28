import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperiencesListComponent } from './experiences-list/experiences-list.component';
import { ExperiencesRoutingModule } from './experiences-routing.module';
import { ExperiencesDetailsComponent } from './experiences-details/experiences-details.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ExperiencesListComponent,
    ExperiencesDetailsComponent
  ],
  imports: [
    CommonModule,
    ExperiencesRoutingModule,
    SharedModule
  ],
  exports: [
    ExperiencesListComponent,
  ]
})
export class ExperiencesModule { }
