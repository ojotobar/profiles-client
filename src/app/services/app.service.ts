import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { SnackbarClassEnum, SnackbarIconEnum } from '../enums/snackbar-enum';
import { UserClaimsModel } from '../models/account/user-claims-model';
import { SnackbarModel } from '../models/common/snackbar-model';
import { SnackbarAnnotatedComponent } from '../utilities/snackbar-annotated/snackbar-annotated.component';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private isSidebarOpened = new BehaviorSubject(false);
  private isLoggedIn = new BehaviorSubject(localStorage.getItem('accessToken') !== null);
  private snackbarModel = new SnackbarModel();
  private _snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  getIsSidebarOpened = this.isSidebarOpened.asObservable();
  getIsLoggedIn = this.isLoggedIn.asObservable();

  constructor(private readonly dialog: MatDialog, private readonly location: Location) { }

  goBack(){
    this.location.back();
  }
  
  setIsSidebarOpened(isSidebarOpened: boolean){
    this.isSidebarOpened.next(isSidebarOpened);
  }

  setClaims(claim: UserClaimsModel){
    localStorage.setItem('accessToken', claim.accessToken);
    this.isLoggedIn.next(localStorage.getItem('accessToken') !== null)
  }

  setIsLoggedIn(isLoggedIn: boolean){
    this.isLoggedIn.next(isLoggedIn);
  }

  openSnackBar(message: string, color: SnackbarClassEnum, icon: SnackbarIconEnum){
    this.snackbarModel.message = message;
    this.snackbarModel.icon = icon;
    this.snackbarModel.color = color;

    this._snackBar.openFromComponent(SnackbarAnnotatedComponent, {
      duration:  7000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      data: this.snackbarModel
    });
  }

  getQueryParam(route: ActivatedRoute, param: string): string | null {
    let valueToReturn: string | null = ''
    route.queryParamMap.subscribe((params) => {
      const value = params.get(param);
      valueToReturn = value;
    })

    return valueToReturn;
  }
}
