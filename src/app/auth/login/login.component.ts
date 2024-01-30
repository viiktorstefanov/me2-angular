import { Component } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  form = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    password: ['', [Validators.required, Validators.minLength(8)] ],
  });

  constructor(private ref: MatDialogRef<LoginComponent>, private fb: FormBuilder) {}

  closeDialog() {
    this.ref.close();
  }

  submitHandler() :void {
    console.log(this.form.value);
  }

  get email() {
    return this.form.controls['email'];
  }

  get password() {
    return this.form.controls['password'];
  }
}
