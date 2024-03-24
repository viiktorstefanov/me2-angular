import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CardComponent } from './card/card.component'; 
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SpinnerComponent,
    CardComponent,
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    SpinnerComponent,
    CardComponent,
  ]
})
export class SharedModule { }
