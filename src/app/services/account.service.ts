import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { AccountConfirmationMutation, ChangePasswordMutation, LoginMutation, RegisterMutation, ResendConfirmationCodeMutation } from './mutations/account-mutations';
import { LoginModel } from '../models/account/login-model';
import { SnackbarClassEnum, SnackbarIconEnum } from '../enums/snackbar-enum';
import { Router } from '@angular/router';
import { UserClaimsModel } from '../models/account/user-claims-model';
import { UserClaimsEnum } from '../enums/user-claims-enum';
import { AppService } from './app.service';
import { RegisterModel } from '../models/account/register-model';
import { AccountVerificationModel } from '../models/account/account-verification-model';
import { ChangePasswordModel } from '../models/account/accounts-models';
import { getChangePasswordInput, getConfirmAccountInput, getLoginInput, getRegisterInput, getResendCodeInput } from './variable-inputs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private safePages: string[] = [
    '/', '/faqs', '/contact', '/about', '/terms-and-conditions'
  ]
  private isHidden = new BehaviorSubject(true);
  appService = inject(AppService);
  router = inject(Router)
  claims = new UserClaimsModel()
  constructor(private readonly apollo: Apollo) { }

  login(loginPayload: LoginModel){
    this.apollo
      .mutate({
        mutation: LoginMutation,
        variables: getLoginInput(loginPayload)
      })
      .subscribe({
        next: (data: any) => {
          let result = (<any>data).data.loginUser.loginResult
          if(result.successful && result.accessToken){
            localStorage.setItem('accessToken', result.accessToken);
            localStorage.setItem('role', this.getUserRoles())
            this.claims.accessToken = result.accessToken;
            this.appService.setClaims(this.claims)
            this.appService.openSnackBar(result.message, SnackbarClassEnum.Success, SnackbarIconEnum.Success);
            this.appService.goBack()
          }
          else{
            this.appService.openSnackBar(result.message, SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
          }
        },
        error: (e: Error) => {
          this.appService.openSnackBar(e.message, SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
        }
      });
  }

  register(payload: RegisterModel){
    this.apollo
      .mutate({
        mutation: RegisterMutation,
        variables: getRegisterInput(payload)
      }).subscribe({
        next: (data: any) => {
          let result = (<any>data).data.registerUser.accountResult;
          if(result.successful){
            this.router.navigate(['/account/confirm'], {
              queryParams: { email: payload.emailAddress }
            })
            this.appService.openSnackBar(result.message, SnackbarClassEnum.Success, SnackbarIconEnum.Success)
          } else{
            this.appService.openSnackBar(result.message, SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
          }
        },
        error: (e: Error) => {
          this.appService.openSnackBar(e.message, SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
        }
      })
  }

  confirmAccount(payload: AccountVerificationModel) {
    this.apollo
      .mutate({
        mutation: AccountConfirmationMutation,
        variables: getConfirmAccountInput(payload.otp, payload.email)
      }).subscribe({
        next: (data: any) => {
          let result = (<any>data).data.verifyAccount.accountResult;
          if(result.successful){
            this.router.navigate(['/account/login']);
            this.appService.openSnackBar(result.message, SnackbarClassEnum.Success, SnackbarIconEnum.Success);
          }
          else{
            this.appService.openSnackBar(result.message, SnackbarClassEnum.Danger, SnackbarIconEnum.Danger); 
          }
        },
        error: (e: Error) => {
          this.appService.openSnackBar(e.message, SnackbarClassEnum.Danger, SnackbarIconEnum.Danger);
        }
      })
  }

  resendConfirmationCode(email: string | null){
    this.apollo
      .mutate({
        mutation: ResendConfirmationCodeMutation,
        variables: getResendCodeInput(email)
      }).subscribe({
        next: (data: any) => {
          let result = (<any>data).data.resendCode.accountResult;
          if(result.successful){
            this.appService.openSnackBar(result.message, SnackbarClassEnum.Success, SnackbarIconEnum.Success);
          }else{
            this.appService.openSnackBar(result.message, SnackbarClassEnum.Danger, SnackbarIconEnum.Danger);
          }
        },
        error: (e: Error) => {
          this.appService.openSnackBar(e.message, SnackbarClassEnum.Danger, SnackbarIconEnum.Danger);
        }
      })
  }

  logout(){
    localStorage.clear();
    this.appService.setIsLoggedIn(false);
    if(!this.safePages.includes(this.router.url)){
      this.router.navigate(['/']);
    }
  }

  changePasswordObservable(payload: ChangePasswordModel): Observable<any> {
    return this.apollo.mutate({
      mutation: ChangePasswordMutation,
      variables: getChangePasswordInput(payload)
    })
  }

  hide = this.isHidden.asObservable();

  clickEvent(event: MouseEvent) {
    this.isHidden.next(!this.isHidden.value)
    event.stopPropagation();
  }

  getUserRoles(): string {
    let accessToken = localStorage.getItem("accessToken");
    if(accessToken){
      let jwtBodyArr = accessToken.split('.')
      if(jwtBodyArr.length > 1){
        let decodedJWT = JSON.parse(window.atob(jwtBodyArr[1]));
        return decodedJWT[UserClaimsEnum.role];
      } else{
        return '';
      }
    } else{
      return '';
    }
  }

  canViewPage(roles: string[]): boolean {
    var role = this.getUserRoles();
    if(role && roles.includes(role)){
      return true;
    } else{
      return false;
    }
  }
}
