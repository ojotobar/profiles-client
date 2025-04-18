import { inject, Injectable } from '@angular/core';
import { OperationVariables } from '@apollo/client/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { GenerateApiKeyQuery, GetProfileQuery, GetProfileSummaryQuery } from './queries/profile-queries';
import { ProfileLocationModel, ProfileUpdateModel } from '../models/profile/profile-models';
import { AddOrUpdateUserLocationMutation, UpdateProfileDetailsMutation } from './mutations/profile-mutations';
import { getLocationInput, getProfileDetailsInput } from './variable-inputs';
import { Observable } from 'rxjs';

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

  getProfileSummaryObservable(): QueryRef<any, OperationVariables> {
    return this.apollo.watchQuery({
      query: GetProfileSummaryQuery
    })
  }

  addOrUpdateLocationObservable(location: ProfileLocationModel): Observable<any> {
    return this.apollo.mutate({
      mutation: AddOrUpdateUserLocationMutation,
      variables: getLocationInput(location)
    })
  }

  updateProfileDetailsObservable(payload: ProfileUpdateModel): Observable<any>{
    return this.apollo.mutate({
      mutation: UpdateProfileDetailsMutation,
      variables: getProfileDetailsInput(payload)
    })
  }

  generateApiKeyObservable(): QueryRef<any, OperationVariables> {
    return this.apollo.watchQuery({
      query: GenerateApiKeyQuery,
    })
  }
}
