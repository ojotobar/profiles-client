import { Component, Inject, inject } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { CareerSummaryService } from '../../../services/career-summary.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogData } from '../../../models/common/snackbar-model';
import { GenericResponseModel, getGenericErrorMessage } from '../../../models/common/common-models';
import { OperationTypeEnum } from '../../../enums/operation-type-enum';
import { SnackbarClassEnum, SnackbarIconEnum } from '../../../enums/snackbar-enum';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-delete-career-summary',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './delete-career-summary.component.html',
  styleUrl: './delete-career-summary.component.scss'
})
export class DeleteCareerSummaryComponent {
  loading: boolean = false;
  appService = inject(AppService);
  summaryService = inject(CareerSummaryService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: MatDialogData,
        public dialogRef: MatDialogRef<DeleteCareerSummaryComponent>){

  }

  deleteRecord(){
    this.loading = true;
    this.summaryService.deleteSummaryObservable(this.data.id)
      .subscribe({
        next: (data: any) => {
          this.loading = (<boolean>data.loading);
          let response = (<GenericResponseModel>data.data.deleteCareerSummary);
          if(response && response.payload){
            if(response.payload.success){
              this.data.refresh = true;
              this.appService.openSnackBar(response.payload.message,
                  SnackbarClassEnum.Success, SnackbarIconEnum.Success);
              this.appService.closeDialog(this.dialogRef, this.data);
            } else {
              this.appService.openSnackBar(response.payload.message,
                  SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
            }
          } else {
            this.appService.openSnackBar(getGenericErrorMessage(OperationTypeEnum.delete),
              SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
          }
        },
        error: (_: Error) => {
          this.loading = false;
          this.appService.openSnackBar(getGenericErrorMessage(OperationTypeEnum.delete),
              SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
        }
      })
  }
}
