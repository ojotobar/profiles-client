import { inject, Injectable } from '@angular/core';
import { AppService } from './app.service';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { AddEducationMutations } from './mutations/education-mutations';
import { SnackbarClassEnum, SnackbarIconEnum } from '../enums/snackbar-enum';
import { EducationModel } from '../models/education/education-models';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  appService = inject(AppService);
  router = inject(Router);
  apollo = inject(Apollo)

  addEducation(payload: EducationModel){
    this.apollo
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
      }).subscribe({
        next: (data: any) => {
          let result = data.data.addEducation.educationResult;
          let success = (<boolean>result.success);
          let message = (<string>result.message);
          if(success){
            this.appService.openSnackBar(message, SnackbarClassEnum.Success, SnackbarIconEnum.Success);
            this.appService.goBack()
          }else {
            this.appService.openSnackBar(message, SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
          }
        },
        error: (error: Error) => {
          this.appService.openSnackBar(error.message, SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
        }
    })
  }
}
