import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NotFound404Component } from './not-found-404/not-found-404.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { ContactsComponent } from './contacts/contacts.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    HomeComponent,
    NotFound404Component,
    SideNavComponent,
    FooterComponent,
    MainComponent,
    ContactsComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    HomeComponent,
    MainComponent,
    SideNavComponent,
  ]
})
export class CoreModule { }
