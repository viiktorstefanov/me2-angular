import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { NotFound404Component } from './core/not-found-404/not-found-404.component';
import { ContactsComponent } from './core/contacts/contacts.component';
import { SearchComponent } from './core/search/search.component';
import { PlacesListComponent } from './places/places-list/places-list.component';
import { ExperiencesListComponent } from './experiences/experiences-list/experiences-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home'
  },
  {
    path: 'contacts',
    component: ContactsComponent,
    title: 'Contacts'
  },
  {
    path: 'search',
    component: SearchComponent,
    title: 'Search'
  },
  {
    path: 'not-found',
    component: NotFound404Component,
    title: '404',
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
