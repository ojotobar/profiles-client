import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserRoleEnum } from '../enums/user-role-enum';

export const adminGuard: CanActivateFn = () => {
  let role = localStorage.getItem('accessToken')
  let isLoggedIn = role !== null;
  let router = inject(Router);

  if(isLoggedIn && role === UserRoleEnum.admin){
    return true;
  }
  else{
    router.navigate(['/unauthorized']);
    return false;
  }
};
