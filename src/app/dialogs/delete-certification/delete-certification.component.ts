import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogData } from '../../models/common/snackbar-model';
import { AppService } from '../../services/app.service';
import { CertificationsService } from '../../services/certifications.service';
import { SnackbarClassEnum, SnackbarIconEnum } from '../../enums/snackbar-enum';
import { getGenericErrorMessage, ResponseModel } from '../../models/common/common-models';
import { OperationTypeEnum } from '../../enums/operation-type-enum';

@Component({
  selector: 'app-delete-certification',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './delete-certification.component.html',
  styleUrl: './delete-certification.component.scss'
})
export class DeleteCertificationComponent {
  loading: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: MatDialogData,
      private dialogRef: MatDialogRef<DeleteCertificationComponent>,
      private readonly appService: AppService,
      private readonly certService: CertificationsService){}

  deleteRecord() {
    if(this.data.id){
      this.loading = true;
      this.certService.deleteCertificationObservable(this.data.id)
        .subscribe({
          next: (data: any) => {
            this.loading = (<boolean>data.loading);
            let result = (<ResponseModel>data.data.deleteCertification.certificationPayload);
            if(result.success){
              this.data.refresh = true;
              this.appService.openSnackBar(result.message, SnackbarClassEnum.Success, SnackbarIconEnum.Success);
              this.closeDialog();
            }
          },
          error: (error: Error) => {
            this.loading = false;
            this.appService.openSnackBar(getGenericErrorMessage(OperationTypeEnum.delete),
              SnackbarClassEnum.Danger, SnackbarIconEnum.Danger
            )
          }
        })
    }
  }

  closeDialog(){
    this.dialogRef.close(this.data)
  }
}
