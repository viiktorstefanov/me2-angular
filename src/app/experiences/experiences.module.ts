import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperiencesListComponent } from './experiences-list/experiences-list.component';
import { ExperiencesRoutingModule } from './experiences-routing.module';
import { ExperiencesDetailsComponent } from './experiences-details/experiences-details.component';



@NgModule({
  declarations: [
    ExperiencesListComponent,
    ExperiencesDetailsComponent
  ],
  imports: [
    CommonModule,
    ExperiencesRoutingModule
  ],
  exports: [
    ExperiencesListComponent,
  ]
})
export class ExperiencesModule { }
