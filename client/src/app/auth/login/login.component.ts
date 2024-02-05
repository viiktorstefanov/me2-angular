import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnDestroy {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    password: ['', [Validators.required, Validators.minLength(8)] ],
  });

  errors: string[] = [];
  private loginSubscription: Subscription | undefined;

  constructor(private ref: MatDialogRef<LoginComponent>, private fb: FormBuilder, private toastr: ToastrService, private userService: UserService, private router: Router) {}

  closeDialog(): void {
    this.ref.close();
  }

  submitHandler(): void {
    if (this.form.invalid) {
       this.toastr.error('All fields are required', 'Error');
       return;
    };

    const { email, password } = this.form.value;
    
    this.loginSubscription = this.userService.login(email!, password!).subscribe({
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
        this.errors.forEach(error => this.toastr.error(error, 'Error'));   
      }
    });
  };

  get email() {
    return this.form.controls['email'];
  };

  get password() {
    return this.form.controls['password'];
  };

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}
