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
  }

  UpdateRecord() {
    console.log(this.data)
  }
}
