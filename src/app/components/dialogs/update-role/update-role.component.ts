import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppService } from '../../../services/app.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogData } from '../../../models/common/snackbar-model';
import { AccountService } from '../../../services/account.service';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FieldErrorsDirective } from '../../../directives/field-errors.directive';
import { MatButtonModule } from '@angular/material/button';
import { GenericResponseModel, getGenericErrorMessage } from '../../../models/common/common-models';
import { SnackbarClassEnum, SnackbarIconEnum } from '../../../enums/snackbar-enum';
import { OperationTypeEnum } from '../../../enums/operation-type-enum';

@Component({
  selector: 'app-update-role',
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    FieldErrorsDirective,
    MatButtonModule
  ],
  templateUrl: './update-role.component.html',
  styles: ``
})
export class UpdateRoleComponent {
  isBusy: boolean = false;
  appService = inject(AppService);
  form!: FormGroup;
  accountService = inject(AccountService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: MatDialogData,
    public readonly dialogRef: MatDialogRef<UpdateRoleComponent>,
    private readonly fb: FormBuilder){
      this.form = this.fb.group({
        roleName: ['', Validators.required]
      })

      this.form.patchValue({ roleName: this.data.name })
  }

  UpdateRecord() {
    if(this.form.valid && this.data.id){
      const roleName = this.form.value.roleName;
      this.isBusy = true;
      this.accountService.updateRoleObservable(this.data.id, roleName)
        .subscribe({
          next: (data) => {
            this.isBusy = <boolean>data.loading;
            const result = (<GenericResponseModel>data.data.updateSystemRole).payload;
            if(result.success){
              this.data.refresh = true;
              this.appService.openSnackBar(result.message, SnackbarClassEnum.Success, SnackbarIconEnum.Success);
              this.appService.closeDialog(this.dialogRef, this.data);
            } else {
              this.appService.openSnackBar(result.message, SnackbarClassEnum.Danger, SnackbarIconEnum.Danger);
            }
          },
          error: (error: Error) => {
            this.isBusy = false;
            this.appService.openSnackBar(getGenericErrorMessage(OperationTypeEnum.update), 
              SnackbarClassEnum.Danger, SnackbarIconEnum.Danger);
          }
      })
    }
  }
}
