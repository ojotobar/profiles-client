import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppService } from '../services/app.service';
import { AccountService } from '../services/account.service';

export const authGuard: CanActivateFn = () => {
  let isLoggedIn = localStorage.getItem('accessToken') !== null;
  inject(AppService).getIsLoggedIn.subscribe(l => isLoggedIn = l);
  let router = inject(Router);
  let accountService = inject(AccountService);
  const isTokenExpired = accountService.isTokenExpired();
  
  
    if(isLoggedIn && !isTokenExpired){
      return true;
    }
    else{
      accountService.logout()
      router.navigate(['/account/login']);
      return false;
    }
};
