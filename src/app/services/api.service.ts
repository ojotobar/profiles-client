import { inject, Injectable } from '@angular/core';
import { timeout, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly locationV1ApiBaseUrl = inject(EnvService).locationApiV1BaseUrl;
  private readonly requestTimeout = 60000; // Timeout in milliseconds (60 seconds)
  
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
