import { inject, Injectable } from '@angular/core';
import { OperationVariables } from '@apollo/client/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { GenerateApiKeyQuery, GetDetailedProfileQuery, GetProfileQuery, GetProfilesQuery, GetProfileSummaryQuery } from './queries/profile-queries';
import { ProfileLocationModel, ProfilesInputModel, ProfileUpdateModel } from '../models/profile/profile-models';
import { AddOrUpdateUserLocationMutation, ChangeRoleMutation, DeactivateAccountMutation, DeleteAccountMutation, StatusChangeMutation, UpdateProfileDetailsMutation } from './mutations/profile-mutations';
import { getDeleteAccountInput, getLocationInput, getProfileDetailsInput, getProfilesInput, getRoleChangeInput, getStatusChangeInput } from './variable-inputs';
import { Observable } from 'rxjs';
import { UserStatusEnum } from '../enums/status-enum';
import { SystemRoleEnum, UserRoleEnum } from '../enums/user-role-enum';

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

  getProfiles(query: ProfilesInputModel | null, skip: number, take: number): QueryRef<any, OperationVariables> {
    return this.apollo.watchQuery({
      query: GetProfilesQuery,
      variables: getProfilesInput(query, skip, take) as OperationVariables
    })
  }

  getDetailedProfile(): QueryRef<any, OperationVariables> {
    return this.apollo.watchQuery({
      query: GetDetailedProfileQuery
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

  changeUserStatusObservable(email: string, status: UserStatusEnum): Observable<any>{
    return this.apollo.mutate({
      mutation: StatusChangeMutation,
      variables: getStatusChangeInput(email, status)
    })
  }

  changeUserRoleObservable(email: string, role: SystemRoleEnum): Observable<any>{
    return this.apollo.mutate({
      mutation: ChangeRoleMutation,
      variables: getRoleChangeInput(email, role)
    })
  }

  deleteAccountObservable(userId: string): Observable<any> {
    return this.apollo.mutate({
      mutation: DeleteAccountMutation,
      variables: getDeleteAccountInput(userId)
    })
  }

  deactivateAccountObservable(): Observable<any>{
    return this.apollo.mutate({
      mutation: DeactivateAccountMutation
    })
  }
}
