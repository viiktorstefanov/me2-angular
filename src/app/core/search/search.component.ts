import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  form = this.fb.group( {
    searchInput: ['', [Validators.required]]
  })

  constructor(private fb: FormBuilder) { }


  searchSubmitHandler(): void {
    console.log(this.form.value);
    
  }
}
