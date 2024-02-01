import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  });

  errors: string[] = [];

  constructor(private ref: MatDialogRef<RegisterComponent>, private fb: FormBuilder, private userService: UserService, private toastr: ToastrService, private router: Router) {}

  closeDialog() {
    this.ref.close();
  }

  submitHandler() :void {
    if(this.form.invalid) {
      return;
    }

    const { firstName, lastName, email, password, phoneNumber } = this.form.value;
    
    this.userService.register(firstName!, lastName!, email!, password!, phoneNumber!).subscribe({
      next: (response) => {
        this.closeDialog();
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.errors = [];
        this.errors.push(err.error.message);
        this.errors.forEach(error => this.toastr.error(error, 'Error')); 
      }
    })
    
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
