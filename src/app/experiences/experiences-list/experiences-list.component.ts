import { Component, OnInit } from '@angular/core';
import { ExperiencesService } from '../experiences.service';
import { Experience } from '../types/experieces';
import { SpinnerService } from '../../shared/spinner/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-experiences-list',
  templateUrl: './experiences-list.component.html',
  styleUrl: './experiences-list.component.css'
})
export class ExperiencesListComponent implements OnInit {
  experiencesList: Experience[] | undefined;
  errors: string[] = [];

  constructor(private experienceService: ExperiencesService, private spinnerService: SpinnerService, private toastr: ToastrService, private router: Router) {}

  ngOnInit(): void {
    this.experienceService.getAllExperiences().subscribe({
      next: (experiences) => {
        this.spinnerService.show(); 
        this.experiencesList = experiences;
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
    })
  }

  
}
