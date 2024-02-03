import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Experience } from '../types/experieces';
import { ExperiencesService } from '../experiences.service';
import { SpinnerService } from '../../shared/spinner/spinner.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-experiences-edit',
  templateUrl: './experiences-edit.component.html',
  styleUrl: './experiences-edit.component.css'
})
export class ExperiencesEditComponent {
  experience: Experience | undefined;
  
  form = this.fb.group( {
    service: ['', [Validators.required, Validators.minLength(5)] ],
    person: ['', [Validators.required, Validators.minLength(3)] ],
    phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
    description: ['', [Validators.required, Validators.minLength(100)]],
  });

  errors: string[] | undefined;


  constructor(private fb: FormBuilder, private experiencesService: ExperiencesService, private spinnerService: SpinnerService, private router: Router, private toastr: ToastrService) {}

  ngOnInit() {
    this.experience = this.experiencesService.experience;
    this.form.controls['service'].setValue(this.experience?.service ?? null);
    this.form.controls['person'].setValue(this.experience?.person ?? null);
    this.form.controls['phoneNumber'].setValue(this.experience?.phoneNumber ?? null);
    this.form.controls['description'].setValue(this.experience?.description ?? null);
  };

  submitHandler() : void {
    this.experiencesService.editExperience(this.experience!._id!, this.form.value.service!, this.form.value.person!, this.form.value.phoneNumber!, this.form.value.description!).subscribe({
      next: () => {
        this.spinnerService.show();
        this.router.navigate(['/experiences/details/' + this.experience!._id]);
        this.spinnerService.hide();     
      },
      error: (err) => {
        if(err.status === 0) {
          this.toastr.error('Unable to connect to the server', 'Error');
          return;
        }
        this.errors = [];
        this.errors.push(err.error.message);
        this.errors.forEach(error => this.toastr.error(error, 'Error')); 
      }
    });
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
