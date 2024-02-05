import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnDestroy {
  form = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
        Validators.minLength(9),
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(8)]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^359[ -]?\d{3}[ -]?\d{2}[ -]?\d{2}[ -]?\d{2}$/)]],
  });

  errors: string[] = [];
  registerSubscription : Subscription | undefined;

  constructor(
    private ref: MatDialogRef<RegisterComponent>,
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  closeDialog() {
    this.ref.close();
  };

  submitHandler(): void {
    if (this.form.invalid) {
      this.toastr.error('All fields are required', 'Error');
      return
    };

    const { firstName, lastName, email, password, phoneNumber } =
      this.form.value;

    this.registerSubscription = this.userService
      .register(firstName!, lastName!, email!, password!, phoneNumber!)
      .subscribe({
        next: (user) => {
          this.closeDialog();
          this.router.navigate(['/home']);
        },
        error: (err) => {
          if (err.status === 0) {
            this.toastr.error('Unable to connect to the server', 'Error');
            return;
          }
          this.errors = [];
          this.errors.push(err.error.message);
          this.errors.forEach((error) => this.toastr.error(error, 'Error'));
        },
      });
  };

  get email() {
    return this.form.controls['email'];
  };

  get firstName() {
    return this.form.controls['firstName'];
  };

  get lastName() {
    return this.form.controls['lastName'];
  };

  get phoneNumber() {
    return this.form.controls['phoneNumber'];
  };

  get password() {
    return this.form.controls['password'];
  };

  ngOnDestroy() :void {
    if(this.registerSubscription) {
      this.registerSubscription.unsubscribe();
    }
  }
}
