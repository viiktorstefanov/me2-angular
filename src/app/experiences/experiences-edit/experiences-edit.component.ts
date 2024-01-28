import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-experiences-edit',
  templateUrl: './experiences-edit.component.html',
  styleUrl: './experiences-edit.component.css'
})
export class ExperiencesEditComponent {
  form = this.fb.group( {
    title: ['', [Validators.required] ],
    city: ['', [Validators.required] ],
    street: ['', [Validators.required]],
    description: ['', [Validators.required]],
  })

  constructor(private fb: FormBuilder) {}

  submitHandler() : void {
    console.log(this.form.value);
    
  }
}
