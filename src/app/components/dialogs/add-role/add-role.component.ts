import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AppService } from '../../../services/app.service';
import { AccountService } from '../../../services/account.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FieldErrorsDirective } from '../../../directives/field-errors.directive';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogData } from '../../../models/common/snackbar-model';
import { MatButtonModule } from '@angular/material/button';
import { SnackbarClassEnum, SnackbarIconEnum } from '../../../enums/snackbar-enum';
import { GenericResponseModel, getGenericErrorMessage } from '../../../models/common/common-models';
import { OperationTypeEnum } from '../../../enums/operation-type-enum';

@Component({
  selector: 'app-add-role',
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    FieldErrorsDirective,
    MatButtonModule
  ],
  templateUrl: './add-role.component.html',
  styles: ``
})
export class AddRoleComponent {
  isBusy: boolean = false;
  appService = inject(AppService);
  form!: FormGroup;
  accountService = inject(AccountService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: MatDialogData,
    public readonly dialogRef: MatDialogRef<AddRoleComponent>,
    private readonly fb: FormBuilder){
      this.form = this.fb.group({
        roleName: ['', Validators.required]
      })
  }

  AddRecord(){
    if(this.form.valid){
      const roleName = this.form.value.roleName;
      this.isBusy = true;
      this.accountService.addRoleObservable(roleName)
        .subscribe({
          next: (data) => {
            this.isBusy = <boolean>data.loading;
            const result = (<GenericResponseModel>data.data.addSystemRole).payload;
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
            this.appService.openSnackBar(getGenericErrorMessage(OperationTypeEnum.add), 
              SnackbarClassEnum.Danger, SnackbarIconEnum.Danger);
          }
      })
    }
  }
}
