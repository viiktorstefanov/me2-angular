import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutComponent } from './logout/logout.component';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
        {
            path: 'logout',
            component: LogoutComponent,
            canActivate: [authGuard],
            title: 'Me2: Logout',
          }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
