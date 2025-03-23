import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Apollo, gql } from 'apollo-angular';
import { EducationResultModel, EducationsResultModel } from '../../models/education/education-models';
import { DatePipe } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AlertComponent } from '../../common/alert/alert.component';
import { AlertModel } from '../../models/common/alert-models';
import { AlertClassEnum, AlertIconEnum } from '../../enums/alert-enums';
import { AppService } from '../../services/app.service';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-education-management',
  imports: [
    MatButtonModule,
    MatIconModule,
    DatePipe,
    MatProgressSpinner,
    AlertComponent,
    MatSelectModule,
    RouterLink
  ],
  templateUrl: './education-management.component.html',
  styleUrl: './education-management.component.scss'
})
export class EducationManagementComponent {
  loading = true;
  apollo = inject(Apollo);
  appService = inject(AppService);
  error: any;
  data: EducationResultModel[] = [];
  alertInputs = new AlertModel();

  ngOnInit() {
    this.getEducations();
  }

  GoBack(){
    this.appService.goBack()
  }

  getEducations(){
    this.apollo
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
          }`}).valueChanges.subscribe({
        next: (data: any) => {
          this.loading = (<boolean>data.loading);
          this.data = (<EducationsResultModel>data.data).educations || [];
          if(this.data.length <= 0){
            this.alertInputs = this.appService.mapAlertMessage(this.alertInputs,
              'No record!', 'No education record found.', AlertIconEnum.info,
              AlertClassEnum.info
            )
          }
        },
        error: (error: Error) => {
          this.error = error;
          this.loading = false;
          this.alertInputs = this.appService.mapAlertMessage(this.alertInputs,
            'An error occurred!', 'An error occurred why getting the data. Please try again later.', 
            AlertIconEnum.danger, AlertClassEnum.danger
          )
        }
      });
  }
}
