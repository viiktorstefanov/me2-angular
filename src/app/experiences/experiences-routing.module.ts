import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExperiencesDetailsComponent } from './experiences-details/experiences-details.component';
import { ExperiencesListComponent } from './experiences-list/experiences-list.component';
import { ExperiencesAddComponent } from './experiences-add/experiences-add.component';

const routes: Routes = [
  {
    path: 'experiences',
    children: [
        {
            path: '',
            pathMatch: 'full',
            component: ExperiencesListComponent,
            title: 'Experiences'
        },
        {
          path: 'add',
          component: ExperiencesAddComponent,
          title: 'Add experience'
        },
        {
            path: ':experienceId',
            component: ExperiencesDetailsComponent,
            title: 'Experience details'
        },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExperiencesRoutingModule { }
