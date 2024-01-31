import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-experiences-add',
  templateUrl: './experiences-add.component.html',
  styleUrl: './experiences-add.component.css'
})
export class ExperiencesAddComponent {
  form = this.fb.group({
    service: ['', [Validators.required, Validators.minLength(5)] ],
    person: ['', [Validators.required, Validators.minLength(3)] ],
    phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
    description: ['', [Validators.required, Validators.minLength(100)]],
  })

  constructor(private fb: FormBuilder, private router: Router) {}

  submitHandler() :void {
    console.log(this.form.value);
    this.router.navigate(['/places'])
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
