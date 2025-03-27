import { inject, Injectable } from '@angular/core';
import { OperationVariables } from '@apollo/client/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { GetProjectQuery, GetProjectsQuery } from './queries/project-queries';
import { ProjectModel } from '../models/project/project-models';
import { Observable } from 'rxjs';
import { AddProjectsMutation, DeleteProjectMutation, UpdateProjectMutation } from './mutations/project-mutations';
import { getAddProjectInput, getIdInput, getUpdateProjectInput } from './variable-inputs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  apollo = inject(Apollo)
  
  getProjectObservable(id: string): QueryRef<any, OperationVariables> {
    return this.apollo.watchQuery({
      query: GetProjectQuery,
      variables: {
        id: id
      } as OperationVariables
    })
  }

  getProjectsObservable(): QueryRef<any, OperationVariables> {
    return this.apollo.watchQuery({
      query: GetProjectsQuery
    })
  }

  addProjectsObservable(payloads: ProjectModel[]): Observable<any> {
    return this.apollo.mutate({
      mutation: AddProjectsMutation,
      variables: getAddProjectInput(payloads)
    })
  }

  updateProjectObservable(id: string, payload: ProjectModel): Observable<any> {
    return this.apollo.mutate({
      mutation: UpdateProjectMutation,
      variables: getUpdateProjectInput(id, payload)
    })
  }

  deleteProjectObservable(id: string): Observable<any> {
    return this.apollo.mutate({
      mutation: DeleteProjectMutation,
      variables: getIdInput(id)
    })
  }
}
