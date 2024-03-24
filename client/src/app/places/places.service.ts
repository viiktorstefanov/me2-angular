import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil, tap } from 'rxjs';
import { Place } from './types/place';

@Injectable({
  providedIn: 'root'
})
export class PlacesService implements OnDestroy {
  private $$place = new BehaviorSubject<Place | undefined>(undefined);

  place: Place | undefined;
  destroy$ = new Subject<void>();

  constructor(private http: HttpClient) { 
    this.$$place.pipe(takeUntil(this.destroy$)).subscribe((place) => {
      this.place = place;
    });
   };

   getAllPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>('/api/places/all').pipe(takeUntil(this.destroy$));
   };

   getById(id: string) : Observable<Place> {
    return this.http.get<Place>(`/api/places/${id}`).pipe(takeUntil(this.destroy$)).pipe(tap((place) => this.$$place.next(place)));
   };

   deleteById(id: string) {
    return this.http.delete(`/api/places/${id}`).pipe(takeUntil(this.destroy$));
  };

   createPlace(title : string, city: string, street: string, description: string) {
    return this.http.post('/api/places/add', {
      title, city, street, description
    }).pipe(takeUntil(this.destroy$));
   };

   editPlace(id: string, title : string, city: string, street: string, description: string) {
    
    return this.http.put(`/api/places/${id}`, {
      title, city, street, description
    }).pipe(takeUntil(this.destroy$));
   };
 
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  };
};
