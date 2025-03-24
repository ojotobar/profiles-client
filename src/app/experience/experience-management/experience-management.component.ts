import { Component, inject } from '@angular/core';
import { ExperienceService } from '../../services/experience.service';
import { ExperienceResultModel, ExperiencesResultModel } from '../../models/experience/experience-models';
import { AlertModel } from '../../models/common/alert-models';
import { AppService } from '../../services/app.service';
import { AlertClassEnum, AlertIconEnum } from '../../enums/alert-enums';
import { MatSelectModule } from '@angular/material/select';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { AlertComponent } from '../../common/alert/alert.component';

@Component({
  selector: 'app-experience-management',
  imports: [
    MatButtonModule,
    MatIconModule,
    DatePipe,
    MatProgressSpinner,
    AlertComponent,
    MatSelectModule,
    RouterLink,
    MatProgressSpinner
  ],
  templateUrl: './experience-management.component.html',
  styleUrl: './experience-management.component.scss'
})
export class ExperienceManagementComponent {
  loading: boolean = false;
  experiences: ExperienceResultModel[] = [];
  alertModel = new AlertModel();
  error: Error | null = null;
  xpService = inject(ExperienceService);
  appService = inject(AppService)

  ngOnInit() {
    this.getExperiences();
  }

  getExperiences(){
    this.loading = true;
    this.xpService.getObservableExperience()
      .valueChanges
      .subscribe({
        next: (data: any) => {
          this.loading = (<boolean>data.loading);
          let result = (<ExperiencesResultModel>data.data);
          if(result && result.experiences.length > 0){
            this.experiences = result.experiences;
          } else {
            this.alertModel = this.appService.mapAlertMessage(this.alertModel, 'No record found', 
              'No experience record found. Please add some.', AlertIconEnum.info, AlertClassEnum.info)
          }
        },
        error: (error: Error) => {
          this.error = error;
          this.alertModel = this.appService.mapAlertMessage(this.alertModel, 'An error occurred', 
            error.message, AlertIconEnum.info, AlertClassEnum.info)
        }
    })
  }

  goBack() {
    this.appService.goBack();
  }

  confirmDelete(id: string, name: string) {

  }
}
