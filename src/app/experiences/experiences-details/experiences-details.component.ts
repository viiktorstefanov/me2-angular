import { Component } from '@angular/core';

@Component({
  selector: 'app-experiences-details',
  templateUrl: './experiences-details.component.html',
  styleUrl: './experiences-details.component.css'
})
export class ExperiencesDetailsComponent {
  constructor() {}

  onDeleteHandler() :void {
    console.log('delete');
  }
}
