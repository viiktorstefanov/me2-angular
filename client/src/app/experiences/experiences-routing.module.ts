import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExperiencesDetailsComponent } from './experiences-details/experiences-details.component';
import { ExperiencesListComponent } from './experiences-list/experiences-list.component';
import { ExperiencesAddComponent } from './experiences-add/experiences-add.component';
import { ExperiencesEditComponent } from './experiences-edit/experiences-edit.component';
import { authGuard } from '../guards/auth.guard';

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
          canActivate: [authGuard],
          title: 'Add'
        },
        {
          path: 'edit/:experienceId',
          component: ExperiencesEditComponent,
          canActivate: [authGuard],
          title: 'Edit'
        },
        {
            path: 'details/:experienceId',
            component: ExperiencesDetailsComponent,
            canActivate: [authGuard],
            title: 'Details'
        },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExperiencesRoutingModule { }
