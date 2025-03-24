import { inject, Injectable } from '@angular/core';
import { OperationVariables } from '@apollo/client/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { GetExperiencesQuery } from './queries/experience-queries';

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
}
