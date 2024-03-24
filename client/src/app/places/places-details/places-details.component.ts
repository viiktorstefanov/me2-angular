import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '../../auth/user.service';
import { Place } from '../types/place';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-places-details',
  templateUrl: './places-details.component.html',
  styleUrl: './places-details.component.css'
})
export class PlacesDetailsComponent implements OnInit, OnDestroy{
  id: string = '';
  place: Place | undefined;
  isOwner: boolean | undefined;
  ownerId: string | undefined;

  errors: string[] | undefined;
  destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private placeService: PlacesService, private userService: UserService, private toastr: ToastrService, private router: Router) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['placeId'];
    this.placeService.getById(this.id).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.place = this.placeService.place;
        this.ownerId = this.place!.ownerId;
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

  onDeleteHandler() :void {
    this.placeService.deleteById(this.id).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.router.navigate(['/places']);
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
