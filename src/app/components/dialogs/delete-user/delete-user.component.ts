import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppService } from '../../../services/app.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogData } from '../../../models/common/snackbar-model';
import { ProfileService } from '../../../services/profile.service';
import { GenericResponseModel, getGenericErrorMessage } from '../../../models/common/common-models';
import { OperationTypeEnum } from '../../../enums/operation-type-enum';
import { SnackbarClassEnum, SnackbarIconEnum } from '../../../enums/snackbar-enum';

@Component({
  selector: 'app-delete-user',
  imports: [
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  templateUrl: './delete-user.component.html',
  styles: ``
})
export class DeleteUserComponent {
  loading: boolean = false;
  appService = inject(AppService);
  profileService = inject(ProfileService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: MatDialogData,
      public readonly dialogRef: MatDialogRef<DeleteUserComponent>){
    
  }

  DeleteAccount() {
    if(this.data.id){
      this.loading = true;
      this.profileService.deleteAccountObservable(this.data.id)
        .subscribe({
          next: (data) => {
            this.loading = <boolean>data.loading;
            let result = (<GenericResponseModel>data.data.deleteAccount).payload;
            if(result.success){
              this.data.refresh = true;
              this.appService
                .openSnackBar(result.message, SnackbarClassEnum.Success, SnackbarIconEnum.Success);
              this.appService.closeDialog(this.dialogRef, this.data)
            }else{
              this.appService.openSnackBar(result.message,
                SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
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
