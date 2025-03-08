import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { UserRoleEnum } from '../enums/user-role-enum';

export const adminGuard: CanActivateFn = () => {
  let role = inject(AccountService).getUserRoles()
  let router = inject(Router);

  if(role && role === UserRoleEnum.admin){
    return true;
  }
  else{
    router.navigate(['/unauthorized']);
    return false;
  }
};
