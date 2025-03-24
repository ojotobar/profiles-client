import { inject, Injectable } from '@angular/core';
import { AppService } from './app.service';
import { Router } from '@angular/router';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { AddEducationMutations, DeleteEducationMutation, UpdateEducationMutation } from './mutations/education-mutations';
import { EducationModel } from '../models/education/education-models';
import { Observable } from 'rxjs';
import { OperationVariables } from '@apollo/client/core';
import { GetEducationQuery } from './queries/education-queries';

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
        variables: {
          "input": {
            "input": {
              "schoolName": payload.schoolName,
              "course": payload.course,
              "startDate": payload.startDate,
              "endDate": payload.endDate,
              "level": payload.level,
              "location": payload.location
            }
          }
        }
      });
  }

  deleteEducationObservable(id: string): Observable<any> {
    return this.apollo.mutate({
      mutation: DeleteEducationMutation,
      variables: {
        "input": {
          "id": id
        }
      }
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
        query: gql`
          query{
            educations{
              id
              institutionName
              major
              level
              levelDescription
              startDate
              endDate
              location{
                city
                state
                country
                longitude
                latitude
              }
            }
        }`
    })
  }

  updateEducationObservable(id: string, payload: EducationModel): Observable<any> {
    return this.apollo.mutate({
      mutation: UpdateEducationMutation,
      variables: {
        "input": {
          "id": id.toString(),
          "input": {
            "schoolName": payload.schoolName,
            "course": payload.course,
            "level": payload.level,
            "startDate": payload.startDate,
            "endDate": payload.endDate,
            "location": {
              "city": payload.location.city,
              "state": payload.location.state,
              "country": payload.location.country,
              "latitude": payload.location.latitude,
              "longitude": payload.location.longitude
            }
          }
        }
      }
    })
  }
}
