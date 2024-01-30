import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {

  form = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3)] ],
    lastName: ['', [Validators.required, Validators.minLength(3)] ],
    email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/), Validators.minLength(9)]],
    password: ['', [Validators.required, Validators.minLength(8)] ],
    phoneNumber: ['', [Validators.required, Validators.minLength(10)] ],
  })
  constructor(private ref: MatDialogRef<RegisterComponent>, private fb: FormBuilder) {}

  closeDialog() {
    this.ref.close();
  }

  submitHandler() :void {
    console.log(this.form.value);
  }

  get email() {
    return this.form.controls['email'];
  }

  get firstName() {
    return this.form.controls['firstName'];
  }

  get lastName() {
    return this.form.controls['lastName'];
  }

  get phoneNumber() {
    return this.form.controls['phoneNumber'];
  }

  get password() {
    return this.form.controls['password'];
  }
}
