import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { CardComponent } from './card/card.component'; 
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SpinnerComponent,
    ButtonComponent,
    InputComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule
  ],
  exports: [
    SpinnerComponent,
    CardComponent,
    ButtonComponent,
    InputComponent
  ]
})
export class SharedModule { }
