import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Experience } from './types/experieces';
import { BehaviorSubject, Observable, Subject, take, takeUntil, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExperiencesService implements OnDestroy{
  private $$experience = new BehaviorSubject<Experience | undefined>(undefined); 

  experience: Experience | undefined;
  destroy$ = new Subject<void>();

  constructor(private http: HttpClient) {
    this.$$experience.pipe(takeUntil(this.destroy$)).subscribe((experience) => {
      this.experience = experience;
    });
   }

  getAllExperiences(): Observable<Experience[]> {
    return this.http.get<Experience[]>('/api/experiences/all').pipe(takeUntil(this.destroy$));
  };

  getById(id: string) : Observable<Experience> {
    return this.http.get<Experience>(`/api/experiences/${id}`).pipe(takeUntil(this.destroy$)).pipe(tap((experience) => this.$$experience.next(experience)));
  };

  deleteById(id: string) {
    return this.http.delete(`/api/experiences/${id}`).pipe(takeUntil(this.destroy$));
  };

  createExperience(service: string, person: string, phoneNumber: string, description: string) {
    return this.http.post('/api/experiences/add', { service, person, phoneNumber, description }).pipe(takeUntil(this.destroy$));
  };

  editExperience(id : string, service: string, person: string, phoneNumber: string, description: string) {
    return this.http.put(`/api/experiences/${id}`, { service, person, phoneNumber, description }).pipe(takeUntil(this.destroy$));
  };

  ngOnDestroy():void {
    this.destroy$.next();
    this.destroy$.complete();
  }
};
