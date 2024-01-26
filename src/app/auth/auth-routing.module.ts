import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  {
    path: 'auth',
    children: [
        {
            path: 'register',
            component: RegisterComponent,
            title: 'Register'
        },
        {
            path: 'login',
            component: LoginComponent,
            title: 'Login'
        },
        {
            path: 'logout',
            component: LogoutComponent,
            // canActivate: [routeGuard],
            title: 'Logout',
          }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
