import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SearchService } from './search.service';
import { Experience } from '../../experiences/types/experieces';
import { Place } from '../../places/types/place';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnDestroy{
  experiences: Experience[] | undefined;
  places: Place[] | undefined;

  form = this.fb.group( {
    searchInput: ['', [Validators.required]]
  });

  errors: string[] | undefined;
  destroy$ = new Subject<void>();
  isMatchesFound : boolean = false;

  constructor(private fb: FormBuilder, private searchService: SearchService, private toastr: ToastrService) { }

  searchSubmitHandler(): void {
    this.experiences = undefined;
    this.places = undefined;
    
    if(this.form.invalid) {
      this.toastr.error('All fields are required', 'Error');
      return;
   };
    const query = this.form.value.searchInput!.trim().toLocaleLowerCase();
    this.searchService.getMatches(query).pipe(takeUntil(this.destroy$)).subscribe({
      next: (matches) => {   
        if(matches.experiences.length > 0 || matches.places.length > 0) {
          this.isMatchesFound = true;
          this.experiences = matches.experiences;  
          this.places = matches.places; 
        } else{
          this.toastr.error('No result found', 'Error')
        }         
      },
      error: (err) => {
        if(err.status === 0) {
          this.toastr.error('Unable to connect to the server', 'Error');
          return;
        };
        this.errors = [];
        this.errors.push(err.error.message);
        this.errors.forEach(error => this.toastr.error(error, 'Error')); 
      },
    });
  };

  ngOnDestroy(): void {
   this.destroy$.next();
   this.destroy$.complete();
  };
};
