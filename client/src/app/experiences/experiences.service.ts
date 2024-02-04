import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Experience } from './types/experieces';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExperiencesService implements OnDestroy{
  private $$experience = new BehaviorSubject<Experience | undefined>(undefined); 
  private experience$ = this.$$experience.asObservable();

  experience: Experience | undefined;
  subscription: Subscription;

  constructor(private http: HttpClient) {
    this.subscription = this.experience$.subscribe((experience) => {
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
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  };

}
