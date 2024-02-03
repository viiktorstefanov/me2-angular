import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Experience } from '../../experiences/types/experieces';
import { Place } from '../../places/types/place';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  experiences: Experience[] | undefined;
  places: Place[] | undefined;
  errors: string[] | undefined;

  constructor(private homeService: HomeService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.homeService.getRecentExperiences().subscribe({
      next: (experieces) => {
        this.experiences = experieces;
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

    this.homeService.getRecentPlaces().subscribe({
      next: (places) => {
        this.places = places;
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
}
