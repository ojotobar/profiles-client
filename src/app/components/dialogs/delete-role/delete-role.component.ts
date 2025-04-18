import { Component, Inject, inject } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { AccountService } from '../../../services/account.service';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogData } from '../../../models/common/snackbar-model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddRoleComponent } from '../add-role/add-role.component';
import { MatIconModule } from '@angular/material/icon';
import { GenericResponseModel, getGenericErrorMessage } from '../../../models/common/common-models';
import { SnackbarClassEnum, SnackbarIconEnum } from '../../../enums/snackbar-enum';
import { OperationTypeEnum } from '../../../enums/operation-type-enum';

@Component({
  selector: 'app-delete-role',
  imports: [
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  templateUrl: './delete-role.component.html',
  styles: ``
})
export class DeleteRoleComponent {
  loading: boolean = false;
  appService = inject(AppService);
  accountService = inject(AccountService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: MatDialogData,
    public readonly dialogRef: MatDialogRef<AddRoleComponent>){
  }

  deleteRecord(){
    if(this.data.id){
      this.loading = true;
      this.accountService.deleteRoleObservable(this.data.id)
        .subscribe({
          next: (data) => {
            this.loading = <boolean>data.loading;
            const result = (<GenericResponseModel>data.data.deleteSystemRole).payload;
            if(result.success){
              this.data.refresh = true;
              this.appService.openSnackBar(result.message, SnackbarClassEnum.Success, SnackbarIconEnum.Success);
              this.appService.closeDialog(this.dialogRef, this.data);
            } else {
              this.appService.openSnackBar(result.message, SnackbarClassEnum.Danger, SnackbarIconEnum.Danger);
            }
          },
          error: (error: Error) => {
            this.loading = false;
            this.appService.openSnackBar(getGenericErrorMessage(OperationTypeEnum.delete), 
              SnackbarClassEnum.Danger, SnackbarIconEnum.Danger);
          }
        })
    }
  }
}
