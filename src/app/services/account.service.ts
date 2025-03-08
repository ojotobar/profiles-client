import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import { LoginMutation } from './mutations/account-mutations';
import { LoginModel } from '../models/account/login-model';
import { AppService } from '../app.service';
import { SnackbarClassEnum, SnackbarIconEnum } from '../enums/snackbar-enum';
import { Router } from '@angular/router';
import { UserClaimsModel } from '../models/account/user-claims-model';
import { UserClaimsEnum } from '../enums/user-claims-enum';

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
        variables: {
          "input": {
            "input": {
              "email": loginPayload.email,
              "password": loginPayload.password
            }
          }
        },
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
          console.log(e.message)
          this.appService.openSnackBar(e.message, SnackbarClassEnum.Danger, SnackbarIconEnum.Danger)
        }
      });
  }

  logout(){
    localStorage.clear();
    this.appService.setIsLoggedIn(false);
    if(!this.safePages.includes(this.router.url)){
      this.router.navigate(['/']);
    }
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
