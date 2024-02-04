import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NotFound404Component } from './not-found-404/not-found-404.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ContactsComponent } from './contacts/contacts.component';
import { SearchComponent } from './search/search.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    HomeComponent,
    NotFound404Component,
    SideNavComponent,
    MainComponent,
    ContactsComponent,
    SearchComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  exports: [
    HomeComponent,
    MainComponent,
    SideNavComponent,
    HeaderComponent
  ]
})
export class CoreModule { }
