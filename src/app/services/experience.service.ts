import { inject, Injectable } from '@angular/core';
import { OperationVariables } from '@apollo/client/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { GetExperiencesQuery } from './queries/experience-queries';
import { AddExperienceMutation } from './mutations/experience-mutations';
import { Observable } from 'rxjs';
import { ExperienceModel } from '../models/experience/experience-models';

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

  addExperiencesObservable(payloads: ExperienceModel[]): Observable<any> {
    return this.apollo.mutate({
      mutation: AddExperienceMutation,
      variables: {
        "input": {
          "inputs": payloads
        }
      }
    })
  }
}
