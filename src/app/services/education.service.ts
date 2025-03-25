import { inject, Injectable } from '@angular/core';
import { AppService } from './app.service';
import { Router } from '@angular/router';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { AddEducationMutations, DeleteEducationMutation, UpdateEducationMutation } from './mutations/education-mutations';
import { EducationModel } from '../models/education/education-models';
import { Observable } from 'rxjs';
import { OperationVariables } from '@apollo/client/core';
import { GetEducationQuery, GetEducationsQuery } from './queries/education-queries';
import { getAddEducationInput, getIdInput, getUpdateEducationInput } from './variable-inputs';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  appService = inject(AppService);
  router = inject(Router);
  apollo = inject(Apollo)

  addEducation(payload: EducationModel): Observable<any> {
    return this.apollo
      .mutate({
        mutation: AddEducationMutations,
        variables: getAddEducationInput(payload)
      });
  }

  deleteEducationObservable(id: string): Observable<any> {
    return this.apollo.mutate({
      mutation: DeleteEducationMutation,
      variables: getIdInput(id)
    });
  }

  getEducationByIdObservable(id: string): QueryRef<unknown, OperationVariables> {
    return this.apollo.watchQuery({
      query: GetEducationQuery,
      variables: {
        "id": id
      } as OperationVariables
    })
  }

  getEducationsObservable(): QueryRef<unknown, OperationVariables> {
    return this.apollo
      .watchQuery({
        query: GetEducationsQuery
    })
  }

  updateEducationObservable(id: string, payload: EducationModel): Observable<any> {
    return this.apollo.mutate({
      mutation: UpdateEducationMutation,
      variables: getUpdateEducationInput(id, payload)
    })
  }
}
