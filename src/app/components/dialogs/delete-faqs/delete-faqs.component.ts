import { Component, inject, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogData } from '../../../models/common/snackbar-model';
import { AppService } from '../../../services/app.service';
import { FaqsItemModel } from '../../../models/common/faqs-models';
import { AlertModel } from '../../../models/common/alert-models';
import { AlertClassEnum, AlertIconEnum } from '../../../enums/alert-enums';
import { GenericResponseModel, getGenericErrorMessage } from '../../../models/common/common-models';
import { OperationTypeEnum } from '../../../enums/operation-type-enum';
import { SnackbarClassEnum, SnackbarIconEnum } from '../../../enums/snackbar-enum';

@Component({
  selector: 'app-delete-faqs',
  imports: [
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  templateUrl: './delete-faqs.component.html',
  styles: ``
})
export class DeleteFaqsComponent {
  loading: boolean = false;
  faq!: FaqsItemModel;
  error!: Error;
  alert = new AlertModel();
  appService = inject(AppService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: MatDialogData,
    public readonly dialogRef: MatDialogRef<DeleteFaqsComponent>){
  }

  deleteRecord(){
    if(this.data.id){
      this.loading = true;
      this.appService.deleteFaqObservable(this.data.id)
        .subscribe({
          next: (data) => {
            this.loading = <boolean>data.loading;
            const result = (<GenericResponseModel>data.data.deleteFaq).payload;
            if(result.success){
              this.data.refresh = true;
              this.appService.openSnackBar(result.message, SnackbarClassEnum.Success, SnackbarIconEnum.Success);
              this.appService.closeDialog(this.dialogRef, this.data)
            }else {
              this.appService.openSnackBar(result.message, SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
            }
          },
          error: (error: Error) => {
            this.loading = false;
            this.appService.openSnackBar(getGenericErrorMessage(OperationTypeEnum.delete), 
              SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
          }
      })
    }
  }
}
