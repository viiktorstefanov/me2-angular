import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExperiencesService } from '../experiences.service';
import { Experience } from '../types/experieces';
import { UserService } from '../../auth/user.service';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-experiences-details',
  templateUrl: './experiences-details.component.html',
  styleUrl: './experiences-details.component.css'
})
export class ExperiencesDetailsComponent implements OnInit, OnDestroy {
  id: string = '';
  experience: Experience | undefined ;
  isOwner: boolean | undefined;
  ownerId: string | undefined;
  
  errors: string[] | undefined;
  destroy$ =  new Subject<void>();

  constructor(private route: ActivatedRoute, private experienceService: ExperiencesService, private userService: UserService, private toastr: ToastrService, private router: Router) { }
 
  ngOnInit() {
    this.id = this.route.snapshot.params['experienceId'];
    this.experienceService.getById(this.id).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.experience = this.experienceService.experience; 
        this.ownerId = this.experience!.ownerId;   
        this.isOwner = this.userService.isOwner(this.ownerId);
      },
      error: (err) => {
        if(err.status === 0) {
          this.toastr.error('Unable to connect to the server', 'Error');
          return;
        };
        this.errors = [];
        this.errors.push(err.error.message);
        this.errors.forEach(error => this.toastr.error(error, 'Error')); 
      }
    });
  };

  onDeleteHandler() : void {
    this.experienceService.deleteById(this.id).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.router.navigate(['/experiences']);
      },
      error: (err) => {
        if(err.status === 0) {
          this.toastr.error('Unable to connect to the server', 'Error');
          return;
        };
        this.errors = [];
        this.errors.push(err.error.message);
        this.errors.forEach(error => this.toastr.error(error, 'Error')); 
      }
    });
  };

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  };
};
