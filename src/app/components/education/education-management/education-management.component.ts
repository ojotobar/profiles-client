import { DatePipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { RouterLink } from "@angular/router";
import { Apollo } from "apollo-angular";
import { AlertIconEnum, AlertClassEnum } from "../../../enums/alert-enums";
import { AlertModel } from "../../../models/common/alert-models";
import { MatDialogData } from "../../../models/common/snackbar-model";
import { EducationResultModel, EducationsResultModel } from "../../../models/education/education-models";
import { AppService } from "../../../services/app.service";
import { DialogService } from "../../../services/dialog.service";
import { EducationService } from "../../../services/education.service";
import { AlertComponent } from "../../common/alert/alert.component";

@Component({
  selector: 'app-education-management',
  imports: [
    MatButtonModule,
    MatIconModule,
    DatePipe,
    MatProgressSpinner,
    AlertComponent,
    MatSelectModule,
    RouterLink,
    MatProgressSpinner,
  ],
  templateUrl: './education-management.component.html',
  styleUrl: './education-management.component.scss'
})
export class EducationManagementComponent {
  loading = true;
  apollo = inject(Apollo);
  appService = inject(AppService);
  dialogService = inject(DialogService);
  educationService = inject(EducationService);
  error: any;
  data: EducationResultModel[] = [];
  alertInputs = new AlertModel();

  ngOnInit() {
    this.getEducations();
  }

  goBack(){
    this.appService.goBack()
  }

  getEducations(){
    this.educationService.getEducationsObservable()
      .valueChanges.subscribe({
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

  confirmDelete(id: string, name: string){
    let dialogRef = this.dialogService.openDeleteEducationDialog(id, name);
    dialogRef.afterClosed().subscribe(result => {
      let response = (<MatDialogData>result);
      if(response.refresh){
        this.getEducations();
      }
    });
  }
}
