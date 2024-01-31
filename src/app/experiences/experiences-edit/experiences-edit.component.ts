import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-experiences-edit',
  templateUrl: './experiences-edit.component.html',
  styleUrl: './experiences-edit.component.css'
})
export class ExperiencesEditComponent {
  form = this.fb.group( {
    service: ['', [Validators.required, Validators.minLength(5)] ],
    person: ['', [Validators.required, Validators.minLength(3)] ],
    phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
    description: ['', [Validators.required, Validators.minLength(100)]],
  });

  constructor(private fb: FormBuilder) {}

  submitHandler() : void {
    console.log(this.form.value);
  }

  get service() {
    return this.form.controls['service'];
  }

  get person() {
    return this.form.controls['person'];
  }

  get phoneNumber() {
    return this.form.controls['phoneNumber'];
  }

  get description() {
    return this.form.controls['description'];
  }
}
