import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Experience } from './types/experieces';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ExperiencesService{
  private $$experience = new BehaviorSubject<Experience | undefined>(undefined); 

  experience: Experience | undefined;

  constructor(private http: HttpClient) {
    this.$$experience.pipe(takeUntilDestroyed()).subscribe((experience) => {
      this.experience = experience;
    });
   }

  getAllExperiences(): Observable<Experience[]> {
    return this.http.get<Experience[]>('/api/experiences/all');
  };

  getById(id: string) : Observable<Experience> {
    return this.http.get<Experience>(`/api/experiences/${id}`).pipe(tap((experience) => this.$$experience.next(experience)));
  };

  deleteById(id: string) {
    return this.http.delete(`/api/experiences/${id}`);
  };

  createExperience(service: string, person: string, phoneNumber: string, description: string) {
    return this.http.post('/api/experiences/add', { service, person, phoneNumber, description });
  };

  editExperience(id : string, service: string, person: string, phoneNumber: string, description: string) {
    return this.http.put(`/api/experiences/${id}`, { service, person, phoneNumber, description });
  };
};
