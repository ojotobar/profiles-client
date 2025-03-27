import { Component, inject } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { AlertComponent } from '../../common/alert/alert.component';
import { AlertModel } from '../../../models/common/alert-models';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CareerSummaryResponseModel } from '../../../models/career-summary/career-summary-models';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CareerSummaryService } from '../../../services/career-summary.service';
import { getGenericErrorMessage } from '../../../models/common/common-models';
import { OperationTypeEnum } from '../../../enums/operation-type-enum';
import { AlertClassEnum, AlertIconEnum } from '../../../enums/alert-enums';
import { DialogService } from '../../../services/dialog.service';
import { MatDialogData } from '../../../models/common/snackbar-model';

@Component({
  selector: 'app-career-summary',
  imports: [
    AlertComponent,
    MatProgressSpinner,
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './career-summary.component.html',
  styleUrl: './career-summary.component.scss'
})
export class CareerSummaryComponent {
  loading: boolean = false;
  alertInputs = new AlertModel();
  error!: Error;
  careerSummary!: CareerSummaryResponseModel;
  appService = inject(AppService);
  summaryService = inject(CareerSummaryService);
  dialogService = inject(DialogService)

  ngOnInit(){
    this.getUserCareerSummary();
  }

  getUserCareerSummary(){
    this.loading = true;

    this.summaryService.getSummaryByUserObservable()
      .valueChanges
      .subscribe({
        next: (data: any) => {
          this.loading = (<boolean>data.loading);
          this.careerSummary = (<CareerSummaryResponseModel>data.data.professionalSummary)
        },
        error: (error: Error) => {
          this.loading = false;
          this.error = error;
          this.alertInputs = this.appService
              .mapAlertMessage(this.alertInputs, 'An error occurred', getGenericErrorMessage(OperationTypeEnum.get),
                  AlertIconEnum.danger, AlertClassEnum.danger)
        }
      })
  }

  openDeleteDialog(){
    if(this.careerSummary){
      let ref = this.dialogService.openDeleteSummaryDialog(this.careerSummary.id, 'Career Summary')
      ref.afterClosed().subscribe(result => {
        let res = (<MatDialogData>result);
        if(res.refresh){
          this.getUserCareerSummary()
        }
      })
    }
  }
}
