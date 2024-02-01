import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExperiencesModule } from './experiences/experiences.module';
import { PlacesModule } from './places/places.module';
import { AuthModule } from './auth/auth.module';
import { ToastrModule } from 'ngx-toastr';

import {MatDialogClose, MatDialogModule} from '@angular/material/dialog'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { appInterceptorProvider } from './app.interceptor';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AuthModule,
    ExperiencesModule,
    PlacesModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    MatDialogModule,
    MatDialogClose,
    MatFormFieldModule,
    MatInputModule,
    ToastrModule.forRoot({positionClass: 'toast-top-center', preventDuplicates: false, progressBar: false, tapToDismiss: true, progressAnimation: 'decreasing', newestOnTop: true, disableTimeOut: false, closeButton: true}),
  ],
  providers: [appInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
