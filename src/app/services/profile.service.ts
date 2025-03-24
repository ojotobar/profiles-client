import { inject, Injectable } from '@angular/core';
import { OperationVariables } from '@apollo/client/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { GetProfileQuery } from './queries/profile-queries';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  apollo = inject(Apollo);

  constructor() { }

  getProfile(): QueryRef<any, OperationVariables> {
    return this.apollo.watchQuery({
      query: GetProfileQuery
    })
  }
}
