import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  http = inject(HttpClient);

  version$ = this.http.get<{ version: string }>('/assets/version.json')
    .pipe(map(data => data.version));
}
