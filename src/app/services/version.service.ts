import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { OperationVariables } from '@apollo/client/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { map } from 'rxjs';
import { GetAvailableTagsQuery } from './queries/common-queries';

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  http = inject(HttpClient);
  apollo = inject(Apollo)

  version$ = this.http.get<{ version: string }>('/assets/version.json')
    .pipe(map(data => data.version));

  getVersionTagsObservable(): QueryRef<any, OperationVariables> {
    return this.apollo.watchQuery({
      query: GetAvailableTagsQuery
    });
  }
}
