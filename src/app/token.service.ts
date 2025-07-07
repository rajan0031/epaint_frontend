import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly TOKEN_KEY = 'authToken';

  constructor() { }

  getToken(): string | null {
    const token = localStorage.getItem(this.TOKEN_KEY) || sessionStorage.getItem(this.TOKEN_KEY);
    if (token && this.isTokenExpired(token)) {
      this.clearToken();
      return null;
    }
    return token;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.TOKEN_KEY);
  }

  getTokenPayload(): any {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (err) {
      return null;
    }
  }

 
  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp; // In seconds since epoch
      const now = Math.floor(Date.now() / 1000); // Current time in seconds
      return exp < now;
    } catch (e) {
      console.error('Invalid token format for expiry check');
      return true; // Assume expired if error in parsing
    }
  }
}
