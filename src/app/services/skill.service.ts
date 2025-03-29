import { inject, Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { SkillModel } from '../models/skills/skills-models';
import { Observable } from 'rxjs';
import { OperationVariables } from '@apollo/client/core';
import { AddSkillsMutation, DeleteSkillsMutation, UpdateSkillsMutation } from './mutations/skill-mutations';
import { getAddSkillsInput, getIdInput, getUpdateSkillsInput } from './variable-inputs';
import { GetSkillQuery, GetSkillsQuery } from './queries/skill-queries';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  apollo = inject(Apollo)

  constructor() { }

  addSkillsObservable(payloads: SkillModel[]): Observable<any> {
    return this.apollo.mutate({
      mutation: AddSkillsMutation,
      variables: getAddSkillsInput(payloads)
    })
  }

  updateSkillObservable(id: string, payload: SkillModel): Observable<any> {
    return this.apollo.mutate({
      mutation: UpdateSkillsMutation,
      variables: getUpdateSkillsInput(id, payload)
    })
  }

  deleteSkillObservable(id: string): Observable<any> {
    return this.apollo.mutate({
      mutation: DeleteSkillsMutation,
      variables: getIdInput(id)
    })
  }

  getSkillsObservable(): QueryRef<any, OperationVariables> {
    return this.apollo.watchQuery({
      query: GetSkillsQuery
    })
  }

  getSkillObservable(id: string): QueryRef<any, OperationVariables> {
    return this.apollo.watchQuery({
      query: GetSkillQuery,
      variables: {
        id: id
      } as OperationVariables
    })
  }

  getSkillCount(): QueryRef<any, OperationVariables> {
    return this.apollo.watchQuery({
      query: gql`
        query{
          skillsCount
        }
      `
    })
  }
}
