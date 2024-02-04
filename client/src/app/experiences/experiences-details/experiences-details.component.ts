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
  id: string = '';
  experience: Experience | undefined ;
  isOwner: boolean | undefined;
  ownerId: string | undefined;
  errors: string[] | undefined;

  constructor(private route: ActivatedRoute, private experienceService: ExperiencesService, private userService: UserService,private spinnerService: SpinnerService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['experienceId'];
    this.experienceService.getById(this.id).subscribe({
      next: () => {
        this.spinnerService.show();
        this.experience = this.experienceService.experience; 
        this.ownerId = this.experience!.ownerId;   
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

  onDeleteHandler() : void {
    this.experienceService.deleteById(this.id).subscribe({
      next: () => {
        this.spinnerService.show();
        this.router.navigate(['/experiences']);
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
