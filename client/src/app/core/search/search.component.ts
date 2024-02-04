import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SearchService } from './search.service';
import { Experience } from '../../experiences/types/experieces';
import { Place } from '../../places/types/place';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  experiences: Experience[] | undefined;
  places: Place[] | undefined;

  form = this.fb.group( {
    searchInput: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, private searchService: SearchService, private toastr: ToastrService) { }


  searchSubmitHandler(): void {
    if(this.form.invalid) {
      this.toastr.error('All fields are required', 'Error');
      return;
   }
    const query = this.form.value.searchInput!.trim().toLocaleLowerCase();
    this.searchService.getMatches(query).subscribe({
      next: (matches) => {    
        this.experiences = matches.experiences;  
        this.places = matches.place;
      }
    });
  }
}
