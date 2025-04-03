import { Component, inject, Inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogData } from '../../../models/common/snackbar-model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppService } from '../../../services/app.service';
import { MatButtonModule } from '@angular/material/button';
import { ChangePasswordModel } from '../../../models/account/accounts-models';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { AccountService } from '../../../services/account.service';
import { GenericResponseModel, getGenericErrorMessage } from '../../../models/common/common-models';
import { SnackbarClassEnum, SnackbarIconEnum } from '../../../enums/snackbar-enum';

@Component({
  selector: 'app-change-password',
  imports: [
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  isBusy: boolean = false;
  hide = signal(true);
  form!: FormGroup;
  appService = inject(AppService);
  accountService = inject(AccountService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: MatDialogData,
    public dialogRef: MatDialogRef<ChangePasswordComponent, any>,
    private readonly fb: FormBuilder){
      this.form = this.fb.group({
        currentPassword: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
        newPassword: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
        confirmNewPassword: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
      })
  }

  ChangePassword() {
    if(this.form.valid){
      let payload = <ChangePasswordModel>this.form.value;
      this.isBusy = true;
      this.accountService.changePasswordObservable(payload)
        .subscribe({
          next: (data: any) => {
            this.isBusy = (<boolean>data.loading)
            let res = (<GenericResponseModel>data.data.changePassword).payload;
            if(res.success){
              this.data.refresh = true;
              this.appService.closeDialog(this.dialogRef, this.data);
              this.appService.openSnackBar(res.message, SnackbarClassEnum.Success, SnackbarIconEnum.Success)
            } else {
              this.appService.openSnackBar(res.message, SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
            }
          },
          error: (error: Error) => {
            this.isBusy = false;
            this.appService.openSnackBar('An error occurred while changing your password. Please try again later',
                SnackbarClassEnum.Danger, SnackbarIconEnum.Danger
            )
          }
        })
    }
  }

  onCheck($event: MatCheckboxChange){
    this.hide.set(!$event.checked)
  }
}
