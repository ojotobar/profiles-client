import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppService } from '../../../services/app.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogData } from '../../../models/common/snackbar-model';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SystemRoleEnum } from '../../../enums/user-role-enum';
import { ProfileService } from '../../../services/profile.service';
import { GenericResponseModel, getGenericErrorMessage } from '../../../models/common/common-models';
import { SnackbarClassEnum, SnackbarIconEnum } from '../../../enums/snackbar-enum';
import { OperationTypeEnum } from '../../../enums/operation-type-enum';

@Component({
  selector: 'app-change-user-role',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatOptionModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './change-user-role.component.html',
  styles: ``
})
export class ChangeUserRoleComponent {
  isBusy: boolean = false;
  form!: FormGroup;
  appService = inject(AppService);
  profileService = inject(ProfileService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: MatDialogData, 
    public dialogRef: MatDialogRef<ChangeUserRoleComponent>, private fb: FormBuilder){
      this.form = this.fb.group({
        name: [this.data.name],
        email: [this.data.id, Validators.compose([Validators.required, Validators.email])],
        role: ['', Validators.required]
      })
  }

  ChangeRole(){
    if(this.form.valid){
      const value = this.form.value;
      const email = value.email as string;
      const role = value.role as SystemRoleEnum;
      this.isBusy = true;
      this.profileService.changeUserRoleObservable(email, role)
        .subscribe({
          next: (data) => {
            this.isBusy = <boolean>data.loading;
            let result = (<GenericResponseModel>data.data.changeRole).payload;
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
