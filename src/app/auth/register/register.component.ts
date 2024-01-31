import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { User } from '../types/User';
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
  })
  constructor(private ref: MatDialogRef<RegisterComponent>, private fb: FormBuilder, private userService: UserService, private router: Router, private toastr: ToastrService) {
    // this.toastr.error('Hello world!', 'Toastr fun!');
  }

  closeDialog() {
    this.ref.close();
  }

  submitHandler() :void {
    // this.userService.register(this.form.value as User).subscribe(
    //   response => {
    //     // Handle successful registration
    //     console.log('Registration successful:', response);
    //     // Optionally, close the dialog
    //     this.ref.close();
    //   },
    //   error => {
    //     // Handle registration error
    //     console.error('Registration error:', error);
    //     // Optionally, show an error message to the user
    //   }
    // );
  
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
