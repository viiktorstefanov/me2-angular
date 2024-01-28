import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-places-edit',
  templateUrl: './places-edit.component.html',
  styleUrl: './places-edit.component.css'
})
export class PlacesEditComponent {
  
  form = this.fb.group( {
    title: ['', [Validators.required] ],
    city: ['', [Validators.required] ],
    street: ['', [Validators.required]],
    description: ['', [Validators.required]],
  })

  constructor(private fb: FormBuilder) {}

  submitHandler() : void {
    console.log(this.form.value);
    
  }
}
