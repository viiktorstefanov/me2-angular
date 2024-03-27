import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { NotFound404Component } from './core/not-found-404/not-found-404.component';
import { ContactsComponent } from './core/contacts/contacts.component';
import { SearchComponent } from './core/search/search.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Me2: Home'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'experiences',
    loadChildren: () => import('./experiences/experiences.module').then((m) => m.ExperiencesModule)
  },
  {
    path: 'places',
    loadChildren: () => import('./places/places.module').then((m) => m.PlacesModule)
  },
  {
    path: 'contacts',
    component: ContactsComponent,
    title: 'Me2: Contacts'
  },
  {
    path: 'search',
    component: SearchComponent,
    title: 'Me2: Search'
  },
  {
    path: 'not-found',
    component: NotFound404Component,
    title: 'Error',
  },
  {
    path: '**',
    redirectTo: '/not-found',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
