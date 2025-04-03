import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AccountVerificationModel } from '../../../models/account/account-verification-model';
import { AccountService } from '../../../services/account.service';
import { AppService } from '../../../services/app.service';
import { AccountCodeTypeEnum } from '../../../enums/user-role-enum';
import { SnackbarClassEnum, SnackbarIconEnum } from '../../../enums/snackbar-enum';
import { GenericResponseModel } from '../../../models/common/common-models';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-account-confirmation',
  imports: [
    MatFormFieldModule,
    MatIconModule,
    RouterLink,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './account-confirmation.component.html',
  styleUrl: './account-confirmation.component.scss'
})
export class AccountConfirmationComponent {
  email: string | null = '';
  loading: boolean = false;

  constructor(private readonly route: ActivatedRoute, 
    private readonly accountService: AccountService, 
    private readonly appService: AppService,
    private readonly router: Router){}

  ngOnInit(){
    this.email = this.appService.getQueryParam(this.route, 'email')
  }

  confirmationForm = new FormGroup({
    otp: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
  });

  ProcessConfirmation(){
    if(this.confirmationForm.valid){
      let payload: AccountVerificationModel = {
        otp: this.confirmationForm.value.otp as string,
        email: this.email as string
      }
      console.log(payload)

      this.accountService.confirmAccountObservable(payload)
        .subscribe({
          next: (data: any) => {
            this.loading = (<boolean>data.loading)
            let result = (<GenericResponseModel>data.data.verifyAccount).payload;
            if(result.success){
              this.router.navigate(['/account/login']);
              this.appService.openSnackBar(result.message, SnackbarClassEnum.Success, SnackbarIconEnum.Success);
            }
            else{
              this.appService.openSnackBar(result.message, SnackbarClassEnum.Danger, SnackbarIconEnum.Danger); 
            }
          },
          error: (e: Error) => {
            this.appService.openSnackBar('An error occurred while verifying your account. Please try again.', 
              SnackbarClassEnum.Danger, SnackbarIconEnum.Danger);
          }
      })
    }
  }

  ResendOtp(){
    this.accountService.resendConfirmationCodeObservable(this.email, AccountCodeTypeEnum.Verification)
      .subscribe({
        next: (data: any) => {
          let result = (<any>data).data.resendCode.accountResult;
          if(result.successful){
            this.appService.openSnackBar(result.message, SnackbarClassEnum.Success, SnackbarIconEnum.Success);
          }else{
            this.appService.openSnackBar(result.message, SnackbarClassEnum.Danger, SnackbarIconEnum.Danger);
          }
        },
        error: (e: Error) => {
          this.appService.openSnackBar('Resending OTP failed. Please try again.', SnackbarClassEnum.Danger, SnackbarIconEnum.Danger);
        }
    });
  }
}
