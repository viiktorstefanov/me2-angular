import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-places-add',
  templateUrl: './places-add.component.html',
  styleUrl: './places-add.component.css'
})
export class PlacesAddComponent {
  form = this.fb.group({
    title: ['', [Validators.required] ],
    city: ['', [Validators.required] ],
    street: ['', [Validators.required]],
    description: ['', [Validators.required]],
  })

  constructor(private fb: FormBuilder, private router: Router) {}

  submitHandler() :void {
    console.log(this.form.value);
    this.router.navigate(['/places'])
  }
  
}
