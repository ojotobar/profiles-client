import { Component, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PasswordResetModel } from '../../../models/account/password-reset-model';
import { AppService } from '../../../services/app.service';
import { FieldErrorsDirective } from '../../../directives/field-errors.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { SnackbarClassEnum, SnackbarIconEnum } from '../../../enums/snackbar-enum';
import { GenericResponseModel } from '../../../models/common/common-models';

@Component({
  selector: 'app-reset-password',
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FieldErrorsDirective
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  loading: boolean = false;
  resetForm!: FormGroup;

  constructor(public readonly appService: AppService,
    private readonly router: Router,
    private readonly accountService: AccountService){
    this.resetForm = new FormGroup({
      emailAddress: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    })
  }
  
  ProcessPasswordReset() {
    if(this.resetForm.valid){
      let email = this.resetForm.value.emailAddress as string;
      this.loading = true;
      this.accountService.resetPasswordObservable(email)
        .subscribe({
          next: (data: any) => {
              this.loading = (<boolean>data.loading);
              let result = (<GenericResponseModel>data.data.resetPassword).payload;
              if(result.success){
                this.appService.openSnackBar(result.message, 
                  SnackbarClassEnum.Success, SnackbarIconEnum.Success);
                  this.router.navigate(['account/change-reset-password', email]);
              }else {
                this.appService.openSnackBar(result.message, 
                  SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
              }
          },
          error: (error: Error) => {
            this.loading = false;
            this.appService.openSnackBar('Password reset failed. Please try again', 
              SnackbarClassEnum.Danger, SnackbarIconEnum.Danger);
          }
        })
    }
  }
}

