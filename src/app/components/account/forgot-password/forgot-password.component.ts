import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../../services/app.service';
import { AccountService } from '../../../services/account.service';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FieldErrorsDirective } from '../../../directives/field-errors.directive';
import { AccountCodeTypeEnum } from '../../../enums/user-role-enum';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { ChangeForgottenPasswordModel } from '../../../models/account/accounts-models';
import { GenericResponseModel } from '../../../models/common/common-models';
import { SnackbarClassEnum, SnackbarIconEnum } from '../../../enums/snackbar-enum';

@Component({
  selector: 'app-forgot-password',
  imports: [
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    FieldErrorsDirective,
    MatCheckboxModule,
    MatButtonModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  email: string | null = '';
  loading: boolean = false;
  form!: FormGroup;
  hidden = signal(true);
  appService = inject(AppService);
  accountService = inject(AccountService)

  constructor(private readonly route: ActivatedRoute, private readonly fb: FormBuilder,
    private readonly router: Router){
    this.route.paramMap.subscribe(route => {
      this.email = route.get('email');
    });

    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      code: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required]
    });

    this.form.patchValue({ email: this.email })
  }

  ResetPassword() {
    if(this.form.valid){
      let payload = <ChangeForgottenPasswordModel>this.form.value;
      this.loading = true;
      this.accountService.changeForgottenPasswordObservable(payload)
        .subscribe({
          next: (data: any) => {
            this.loading = <boolean>data.loading;
            let result = (<GenericResponseModel>data.data.changeForgottenPassword).payload;
            if(result.success){
              this.appService.openSnackBar(result.message, SnackbarClassEnum.Success, SnackbarIconEnum.Success)
              this.router.navigate(['/account/login'])
            }else {
              this.loading = false;
              this.appService.openSnackBar(result.message, SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
            }
          },
          error: (error: Error) => {
            this.loading = false;
            this.appService.openSnackBar('An error occurred while changing the password. Please try again', SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
          }
        })
    }
  }

  onCheckboxChange($event: MatCheckboxChange){
    this.hidden.set(!$event.checked);
  }
}
