import { inject, Injectable } from '@angular/core';
import { timeout, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private locationV1ApiBaseUrl = 'https://locations-marker.onrender.com/api/v1/location';
  private requestTimeout = 60000; // Timeout in milliseconds (60 seconds)
  readonly appService = inject(AppService);
  
  constructor(private http: HttpClient) { }

  getCountries(): Observable<any> {
    return this.http.get(`${this.locationV1ApiBaseUrl}/countries`).pipe(
      timeout(this.requestTimeout),
      catchError((error: Error) => {
        return throwError(() => error);
      })
    );
  }

  getCountryStates(countryId: string): Observable<any> {
    return this.http.get(`${this.locationV1ApiBaseUrl}/country/${countryId}/states`).pipe(
      timeout(this.requestTimeout),
      catchError((error: Error) => {
        return throwError(() => error);
      })
    );
  }
}
