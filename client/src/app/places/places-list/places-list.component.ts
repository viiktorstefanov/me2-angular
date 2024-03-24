import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Place } from '../types/place';
import { Subject, takeUntil } from 'rxjs';
import { PlacesService } from '../places.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-places-list',
  templateUrl: './places-list.component.html',
  styleUrls: ['./places-list.component.css']
})
export class PlacesListComponent implements OnInit, OnDestroy {

  placesList: Place[] = [];
  displayedPlaces: Place[] | undefined;
  errors: string[] = [];
  private destroy$ = new Subject<void>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private placesService: PlacesService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.placesService.getAllPlaces().pipe(takeUntil(this.destroy$)).subscribe({
      next: (places) => {
        this.placesList = places;
        this.paginator.length = this.placesList.length;
        this.updateDisplayedPlaces();
      },
      error: (err) => {
        if (err.status === 0) {
          this.toastr.error('Unable to connect to the server', 'Error');
          return;
        }
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

  onPageChange(event: PageEvent) {
    this.updateDisplayedPlaces();
  };

  private updateDisplayedPlaces() {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.displayedPlaces = this.placesList.slice(startIndex, endIndex);
  };
}
