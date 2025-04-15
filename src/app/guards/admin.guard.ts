import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserRoleEnum } from '../enums/user-role-enum';
import { AccountService } from '../services/account.service';

export const adminGuard: CanActivateFn = () => {
  let role = localStorage.getItem('role')
  let isLoggedIn = role !== null;
  let router = inject(Router);
  let accountService = inject(AccountService);
  const isTokenExpired = accountService.isTokenExpired()

  if(isLoggedIn && role === UserRoleEnum.admin && !isTokenExpired){
    return true;
  } else if(isTokenExpired){
    accountService.logout();
    router.navigate(['/account/login']);
    return false;
  }
  else{
    router.navigate(['/unauthorized']);
    return false;
  }
};
