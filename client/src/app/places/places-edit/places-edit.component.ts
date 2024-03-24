import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { PlacesService } from '../places.service';
import { Router } from '@angular/router';
import { Place } from '../types/place';

@Component({
  selector: 'app-places-edit',
  templateUrl: './places-edit.component.html',
  styleUrl: './places-edit.component.css',
})
export class PlacesEditComponent implements OnInit, OnDestroy {
  place: Place | undefined;

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    city: ['', [Validators.required, Validators.minLength(3)]],
    street: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(100)]],
  });

  errors: string[] | undefined;
  destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private placeService: PlacesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.place = this.placeService.place;
    this.form.controls['title'].setValue(this.place?.title ?? null);
    this.form.controls['city'].setValue(this.place?.city ?? null);
    this.form.controls['street'].setValue(this.place?.street ?? null);
    this.form.controls['description'].setValue(this.place?.description ?? null);
  };

  submitHandler(): void {
    if (this.form.invalid) {
      this.toastr.error('All fields are required', 'Error');
      return;
    }
    this.placeService
      .editPlace(
        this.place!._id!,
        this.form.value.title!,
        this.form.value.city!,
        this.form.value.street!,
        this.form.value.description!
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.router.navigate(['/places/details/' + this.place?._id]);
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
