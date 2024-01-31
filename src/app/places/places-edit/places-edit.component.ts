import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-places-edit',
  templateUrl: './places-edit.component.html',
  styleUrl: './places-edit.component.css'
})
export class PlacesEditComponent {
  
  form = this.fb.group( {
    title: ['', [Validators.required, Validators.minLength(5)] ],
    city: ['', [Validators.required, Validators.minLength(3)] ],
    street: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(100)]],
  })

  constructor(private fb: FormBuilder) {}

  submitHandler() : void {
    console.log(this.form.value);
  }

  get title() {
    return this.form.controls['title'];
  }

  get city() {
    return this.form.controls['city'];
  }

  get street() {
    return this.form.controls['street'];
  }

  get description() {
    return this.form.controls['description'];
  }
}
