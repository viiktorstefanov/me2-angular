import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExperiencesDetailsComponent } from './experiences-details/experiences-details.component';
import { ExperiencesListComponent } from './experiences-list/experiences-list.component';
import { ExperiencesAddComponent } from './experiences-add/experiences-add.component';
import { ExperiencesEditComponent } from './experiences-edit/experiences-edit.component';
import { authGuard } from '../guards/auth.guard';
import { ownerGuard } from '../guards/owner.guard';

const routes: Routes = [
        {
            path: '',
            pathMatch: 'full',
            component: ExperiencesListComponent,
            title: 'Me2: Experiences'
        },
        {
          path: 'add',
          component: ExperiencesAddComponent,
          canActivate: [authGuard],
          title: 'Me2: Add'
        },
        {
          path: 'edit/:experienceId',
          component: ExperiencesEditComponent,
          canActivate: [authGuard, ownerGuard],
          title: 'Me2: Edit'
        },
        {
            path: 'details/:experienceId',
            component: ExperiencesDetailsComponent,
            canActivate: [authGuard],
            title: 'Me2: Details'
        },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExperiencesRoutingModule { }
