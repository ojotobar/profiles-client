import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { CertificationModel } from '../models/certifications/certifications-models';
import { Observable } from 'rxjs';
import { AddCertificationsMutation, UpdateCertificationMutation } from './mutations/certifications-mutations';
import { getAddCertificationsInput, getIdInput, getUpdateCertificationInput } from './variable-inputs';
import { DeleteEducationMutation } from './mutations/education-mutations';
import { OperationVariables } from '@apollo/client/core';
import { GetCertificationByIdQuery, GetCertificationsQuery } from './queries/certification-queries';

@Injectable({
  providedIn: 'root'
})
export class CertificationsService {

  constructor(private readonly apollo: Apollo) { }

  addCertificationsObservable(payloads: CertificationModel[]): Observable<any> {
    return this.apollo.mutate({
      mutation: AddCertificationsMutation,
      variables: getAddCertificationsInput(payloads)
    });
  }

  updateCertificationObservable(id: string, payload: CertificationModel): Observable<any> {
    return this.apollo.mutate({
      mutation: UpdateCertificationMutation,
      variables: getUpdateCertificationInput(id, payload)
    })
  }

  deleteCertificationObservable(id: string): Observable<any> {
    return this.apollo.mutate({
      mutation: DeleteEducationMutation,
      variables: getIdInput(id)
    })
  }

  getCertificationsObservable(): QueryRef<any, OperationVariables> {
    return this.apollo.watchQuery({
      query: GetCertificationsQuery
    })
  }

  getCertificationObservable(id: string): QueryRef<any, OperationVariables> {
    return this.apollo.watchQuery({
      query: GetCertificationByIdQuery,
      variables: {
        "id": id
      } as OperationVariables
    })
  }
}
