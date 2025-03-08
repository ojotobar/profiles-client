import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppService } from '../app.service';

export const authGuard: CanActivateFn = () => {
  let isLoggedIn = false;
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
