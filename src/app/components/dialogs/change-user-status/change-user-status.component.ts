import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppService } from '../../../services/app.service';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogData } from '../../../models/common/snackbar-model';
import { UserStatusEnum } from '../../../enums/status-enum';
import { ProfileService } from '../../../services/profile.service';
import { GenericResponseModel, getGenericErrorMessage } from '../../../models/common/common-models';
import { OperationTypeEnum } from '../../../enums/operation-type-enum';
import { SnackbarClassEnum, SnackbarIconEnum } from '../../../enums/snackbar-enum';

@Component({
  selector: 'app-change-user-status',
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatProgressSpinner
  ],
  templateUrl: './change-user-status.component.html',
  styles: ``
})
export class ChangeUserStatusComponent {
  isBusy: boolean = false;
  form!: FormGroup;
  appService = inject(AppService);
  profileService = inject(ProfileService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: MatDialogData, 
    public readonly dialogRef: MatDialogRef<ChangeUserStatusComponent>,
    private readonly fb: FormBuilder){
      this.form = this.fb.group({
        name: [this.data.name],
        email: [this.data.id, Validators.compose([Validators.required, Validators.email])],
        status: ['', Validators.required]
      })
  }

  ChangeStatus(){
    if(this.form.valid){
      const value = this.form.value;
      const email = value.email as string;
      const status = value.status as UserStatusEnum;

      this.isBusy = true;
      this.profileService.changeUserStatusObservable(email, status)
        .subscribe({
          next: (data) => {
            this.isBusy = <boolean>data.loading;
            let result = (<GenericResponseModel>data.data.changeStatus).payload;
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
            this.isBusy = false;
            this.appService.openSnackBar(getGenericErrorMessage(OperationTypeEnum.update),
              SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
          }
        })
    }
  }
}
