import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { PlacesService } from '../places.service';


@Component({
  selector: 'app-places-add',
  templateUrl: './places-add.component.html',
  styleUrl: './places-add.component.css'
})
export class PlacesAddComponent implements OnDestroy {
  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5)] ],
    city: ['', [Validators.required, Validators.minLength(3)] ],
    street: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(100)]],
  });

  errors: string[] | undefined;
  destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private placesService: PlacesService) {}

  submitHandler() :void {
    if(this.form.invalid) {
      this.toastr.error('All fields are required', 'Error');
      return;
   };
   this.placesService.createPlace(this.form.value.title!, this.form.value.city!, this.form.value.street!, this.form.value.description!).pipe(takeUntil(this.destroy$)).subscribe({
    next: () => {
      this.router.navigate(['/places'])
    },
    error: (err) => {
      if(err.status === 0) {
        this.toastr.error('Unable to connect to the server', 'Error');
        return;
      };
      this.errors = [];
      this.errors.push(err.error.message);
      this.errors.forEach(error =>  this.toastr.error(error, 'Error'));
    }
   });
  };
  
  get title() {
    return this.form.controls['title'];
  };

  get city() {
    return this.form.controls['city'];
  };

  get street() {
    return this.form.controls['street'];
  };

  get description() {
    return this.form.controls['description'];
  };

  ngOnDestroy() : void {
    this.destroy$.next();
    this.destroy$.complete();
  };
};
