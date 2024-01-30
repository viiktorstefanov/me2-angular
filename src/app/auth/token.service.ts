import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  user: string = 'userData';

  constructor() { }

  clearToken(): void {
    localStorage.removeItem(this.user);
  }
}
