import { inject, Injectable } from '@angular/core';
import { OperationVariables } from '@apollo/client/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { GetExperienceByIdQuery, GetExperiencesQuery } from './queries/experience-queries';
import { AddExperienceMutation, DeleteExperienceMutation, UpdateExperienceMutation } from './mutations/experience-mutations';
import { Observable } from 'rxjs';
import { ExperienceModel } from '../models/experience/experience-models';
import { getAddExperiencesInputs, getIdInput, getUpdateExperienceInput } from './variable-inputs';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  apollo = inject(Apollo)
  constructor() { }

  getObservableExperience(): QueryRef<any, OperationVariables> {
    return this.apollo.watchQuery({
      query: GetExperiencesQuery
    })
  }

  getObservableExperienceById(id: string): QueryRef<any, OperationVariables> {
    return this.apollo.watchQuery({
      query: GetExperienceByIdQuery,
      variables: {
        id: id
      } as OperationVariables
    })
  }

  addExperiencesObservable(payloads: ExperienceModel[]): Observable<any> {
    return this.apollo.mutate({
      mutation: AddExperienceMutation,
      variables: getAddExperiencesInputs(payloads)
    })
  }

  deleteExperienceObservable(id: string): Observable<any> {
    return this.apollo.mutate({
      mutation: DeleteExperienceMutation,
      variables: getIdInput(id)
    })
  }

  updateExperienceObservable(id: string, payload: ExperienceModel): Observable<any> {
    return this.apollo.mutate({
      mutation: UpdateExperienceMutation,
      variables: getUpdateExperienceInput(id, payload)
    })
  }
}
