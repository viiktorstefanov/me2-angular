import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExperiencesService } from '../experiences.service';
import { SpinnerService } from '../../shared/spinner/spinner.service';
import { ToastrService } from 'ngx-toastr';

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
  });

  errors: string[] | undefined;

  constructor(private fb: FormBuilder, private router: Router, private experiencesService: ExperiencesService, private spinnerService: SpinnerService, private toastr: ToastrService) {}

  submitHandler() :void {
    this.experiencesService.createExperience(this.form.value.service!, this.form.value.person!, this.form.value.phoneNumber!, this.form.value.description!).subscribe({
      next: () => {
        this.spinnerService.show();
        this.router.navigate(['/experiences']);
        this.spinnerService.hide();
      },
      error: (err) => {
        if(err.status === 0) {
          this.toastr.error('Unable to connect to the server', 'Error');
          return;
        }
        this.spinnerService.show();
        this.errors = [];
        this.errors.push(err.error.message);
        this.spinnerService.hide();
        this.errors.forEach(error =>  this.toastr.error(error, 'Error'));
      }
    })
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
