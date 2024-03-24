import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ExperiencesService } from '../experiences.service';
import { Experience } from '../types/experieces';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-experiences-list',
  templateUrl: './experiences-list.component.html',
  styleUrl: './experiences-list.component.css'
})
export class ExperiencesListComponent implements OnInit, OnDestroy {
  experiencesList: Experience[] = [];
  displayedExperiences: Experience[] | undefined;
  errors: string[] = [];
  private destroy$ = new Subject<void>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private experienceService: ExperiencesService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.experienceService.getAllExperiences().pipe(takeUntil(this.destroy$)).subscribe({
      next: (experiences) => {
        this.experiencesList = experiences;
        this.paginator.length = this.experiencesList.length;
        this.updateDisplayedExperiences();
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

  onPageChange(event: PageEvent) {
    this.updateDisplayedExperiences();
  };

  private updateDisplayedExperiences() {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.displayedExperiences = this.experiencesList?.slice(startIndex, endIndex);
  }
};