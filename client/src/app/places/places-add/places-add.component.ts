import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-places-add',
  templateUrl: './places-add.component.html',
  styleUrl: './places-add.component.css'
})
export class PlacesAddComponent {
  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5)] ],
    city: ['', [Validators.required, Validators.minLength(3)] ],
    street: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(100)]],
  })

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService) {}

  submitHandler() :void {
    if(this.form.invalid) {
      this.toastr.error('All fields are required', 'Error');
      return;
   }
    this.router.navigate(['/places'])
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
