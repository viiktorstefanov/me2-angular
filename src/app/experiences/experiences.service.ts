import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Experience } from './types/experieces';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExperiencesService {
  constructor(private http: HttpClient) { }


  getAllExperiences(): Observable<Experience[]> {
    return this.http.get<Experience[]>('/api/experiences/all');
  };

  getById(id: string) : Observable<Experience> {
    return this.http.get<Experience>(`/api/experiences/${id}`);
  };

}
