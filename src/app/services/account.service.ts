import { inject, Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { AccountConfirmationMutation, AddSystemRoleMutation, ChangeForgottenPasswordMutation, ChangePasswordMutation, DeleteSystemRoleMutation, LoginMutation, RegisterMutation, ResendConfirmationCodeMutation, ResetPasswordMutation, UpdateSystemRoleMutation } from './mutations/account-mutations';
import { LoginModel } from '../models/account/login-model';
import { SnackbarClassEnum, SnackbarIconEnum } from '../enums/snackbar-enum';
import { Router } from '@angular/router';
import { JwtPayload, UserClaimsModel } from '../models/account/user-claims-model';
import { UserClaimsEnum } from '../enums/user-claims-enum';
import { AppService } from './app.service';
import { RegisterModel } from '../models/account/register-model';
import { AccountVerificationModel } from '../models/account/account-verification-model';
import { ChangeForgottenPasswordModel, ChangePasswordModel } from '../models/account/accounts-models';
import { getAddRoleInput, getChangeForgottenPassInput, getChangePasswordInput, getConfirmAccountInput, getEmailInput, getIdInput, getLoginInput, getRegisterInput, getResendCodeInput, getUpdateRoleInput } from './variable-inputs';
import { AccountCodeTypeEnum } from '../enums/user-role-enum';
import { GenericResponseModel } from '../models/common/common-models';
import { GetSystemRolesQuery } from './queries/account-queries';
import { OperationVariables } from '@apollo/client/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private safePages: string[] = [
    '/', '/faqs', '/contact', '/about', '/terms-and-conditions'
  ];

  private isHidden = new BehaviorSubject(true);
  appService = inject(AppService);
  router = inject(Router)
  constructor(private readonly apollo: Apollo) { }

  loginObservable(loginPayload: LoginModel): Observable<any> {
    return this.apollo
      .mutate({
        mutation: LoginMutation,
        variables: getLoginInput(loginPayload)
    });
  }

  registerObservable(payload: RegisterModel): Observable<any> {
    return this.apollo
      .mutate({
        mutation: RegisterMutation,
        variables: getRegisterInput(payload)
    });
  }

  confirmAccountObservable(payload: AccountVerificationModel): Observable<any> {
    return this.apollo.mutate({
        mutation: AccountConfirmationMutation,
        variables: getConfirmAccountInput(payload.otp, payload.email)
    })
  }

  resendConfirmationCodeObservable(email: string | null, code: AccountCodeTypeEnum): Observable<any>{
    return this.apollo.mutate({
      mutation: ResendConfirmationCodeMutation,
      variables: getResendCodeInput(email, code)
    })
  }

  resetPasswordObservable(email: string): Observable<any> {
    return this.apollo.mutate({
      mutation: ResetPasswordMutation,
      variables: getEmailInput(email)
    })
  }

  changeForgottenPasswordObservable(payload: ChangeForgottenPasswordModel): Observable<any> {
    return this.apollo.mutate({
      mutation: ChangeForgottenPasswordMutation,
      variables: getChangeForgottenPassInput(payload)
    });
  }

  addRoleObservable(name: string): Observable<any> {
    return this.apollo.mutate({
      mutation: AddSystemRoleMutation,
      variables: getAddRoleInput(name)
    })
  }

  updateRoleObservable(id: string, name: string): Observable<any> {
    return this.apollo.mutate({
      mutation: UpdateSystemRoleMutation,
      variables: getUpdateRoleInput(id, name)
    })
  }

  deleteRoleObservable(id: string): Observable<any> {
    return this.apollo.mutate({
      mutation: DeleteSystemRoleMutation,
      variables: getIdInput(id)
    })
  }

  getSystemRoles(): QueryRef<any, OperationVariables> {
    return this.apollo.watchQuery({
      query: GetSystemRolesQuery
    });
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

  isTokenExpired(): boolean {
    try {
      const token = localStorage.getItem('accessToken');
      if(token){
        let jwtBodyArr = token.split('.');
        if(jwtBodyArr.length > 1){
          let decodedJWT = JSON.parse(window.atob(jwtBodyArr[1]));
          const now = Math.floor(Date.now() / 1000);
          return (<number>decodedJWT.exp) < now;
        } else{
          return true;
        }
      }else {
        return true
      }
    } catch (e) {
      return true;
    }
  }
}
