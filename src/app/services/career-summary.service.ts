import { inject, Injectable } from '@angular/core';
import { OperationVariables } from '@apollo/client/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { CareerSummaryByIdQuery, CareerSummaryByUserQuery } from './queries/career-summary-queries';
import { Observable } from 'rxjs';
import { AddCareerSummaryMutation, DeleteCareerSummaryMutation, UpdateCareerSummaryMutation } from './mutations/career-summary-mutations';
import { getAddCareerSummaryInput, getIdInput, getUpdateCareerSummaryInput } from './variable-inputs';

@Injectable({
  providedIn: 'root'
})
export class CareerSummaryService {
  apollo = inject(Apollo)
  constructor() { }

  getSummaryByIdObservable(id: string): QueryRef<any, OperationVariables>{
    return this.apollo.watchQuery({
      query: CareerSummaryByIdQuery,
      variables: {
        id: id
      } as OperationVariables
    })
  }

  getSummaryByUserObservable(): QueryRef<any, OperationVariables>{
    return this.apollo.watchQuery({
      query: CareerSummaryByUserQuery
    })
  }
  
  addSummaryObservable(summary: string): Observable<any> {
    return this.apollo.mutate({
      mutation: AddCareerSummaryMutation,
      variables: getAddCareerSummaryInput(summary)
    })
  }

  updateSummaryObservable(id: string, summary: string): Observable<any> {
    return this.apollo.mutate({
      mutation: UpdateCareerSummaryMutation,
      variables: getUpdateCareerSummaryInput(id, summary)
    })
  }

  deleteSummaryObservable(id: string): Observable<any> {
    return this.apollo.mutate({
      mutation: DeleteCareerSummaryMutation,
      variables: getIdInput(id)
    })
  }
}
