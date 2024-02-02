import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExperiencesService } from '../experiences.service';
import { Experience } from '../types/experieces';
import { UserService } from '../../auth/user.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../../shared/spinner/spinner.service';

@Component({
  selector: 'app-experiences-details',
  templateUrl: './experiences-details.component.html',
  styleUrl: './experiences-details.component.css'
})
export class ExperiencesDetailsComponent implements OnInit {
  experience: Experience | undefined ;
  isOwner: boolean | undefined;
  ownerId: string | undefined;
  errors: string[] | undefined;

  constructor(private route: ActivatedRoute, private experienceService: ExperiencesService, private userService: UserService,private spinnerService: SpinnerService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.params['experienceId'];
    this.experienceService.getById(id).subscribe({
      next: (experience) => {
        this.spinnerService.show();
        this.experience = experience;   
        this.ownerId = experience.ownerId;   
        this.isOwner = this.userService.isOwner(this.ownerId);
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

  onDeleteHandler() :void {
    console.log('delete');
  }
}
