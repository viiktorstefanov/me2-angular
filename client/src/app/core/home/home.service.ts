import { Injectable } from '@angular/core';
import { Experience } from '../../experiences/types/experieces';
import { Place } from '../../places/types/place';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getRecentExperiences(): Observable<Experience[]> {
    return this.http.get<Experience[]>('/api/experiences/recent');
  };

  getRecentPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>('/api/places/recent');
  };
}
