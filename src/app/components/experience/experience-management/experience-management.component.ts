import { DatePipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { RouterLink } from "@angular/router";
import { AlertIconEnum, AlertClassEnum } from "../../../enums/alert-enums";
import { AlertModel } from "../../../models/common/alert-models";
import { MatDialogData } from "../../../models/common/snackbar-model";
import { ExperienceResultModel, ExperiencesResultModel } from "../../../models/experience/experience-models";
import { AppService } from "../../../services/app.service";
import { DialogService } from "../../../services/dialog.service";
import { ExperienceService } from "../../../services/experience.service";
import { AlertComponent } from "../../common/alert/alert.component";
import { ValueornullPipe } from "../../../pipes/valueornull.pipe";

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
    MatProgressSpinner,
    ValueornullPipe
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
  appService = inject(AppService);
  dialogService = inject(DialogService)
  
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
          this.experiences = (<ExperienceResultModel[]>data.data.experiences);
          if(this.experiences && this.experiences.length <= 0){
            this.alertModel = this.appService.mapAlertMessage(this.alertModel, 'No record found', 
              'No experience record found. Please add some.', AlertIconEnum.info, AlertClassEnum.info)
          }
        },
        error: (error: Error) => {
          this.error = error;
          this.loading = false;
          this.alertModel = this.appService.mapAlertMessage(this.alertModel, 'An error occurred', 
            'An error occurred while getting the record. Please try again. Contact support if issue persists', 
            AlertIconEnum.danger, AlertClassEnum.danger)
        }
    })
  }

  goBack() {
    this.appService.goBack();
  }

  confirmDelete(id: string, name: string) {
    let dialogRef = this.dialogService.openDeleteExperienceDialog(id, name);
        dialogRef.afterClosed().subscribe(result => {
          let response = (<MatDialogData>result);
          if(response.refresh){
            this.getExperiences();
          }
    });
  }
}
