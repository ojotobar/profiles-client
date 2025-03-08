import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppService } from '../services/app.service';

export const authGuard: CanActivateFn = () => {
  let isLoggedIn = localStorage.getItem('accessToken') !== null;
    inject(AppService).getIsLoggedIn.subscribe(l => isLoggedIn = l);
    let router = inject(Router);
  
    if(isLoggedIn){
      return true;
    }
    else{
      router.navigate(['/account/login']);
      return false;
    }
};
