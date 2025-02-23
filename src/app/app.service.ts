import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SnackbarIconEnum, SnackbarClassEnum } from '../enums/snackbar.enum';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { SnackbarAnnotatedComponent } from './utilities/snackbar-annotated/snackbar-annotated.component';
import { SnackbarModel } from '../models/snackbar.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private isSidebarOpened = new BehaviorSubject(false);
  private isLoggedIn = new BehaviorSubject(false);
  private snackbarModel = new SnackbarModel();
  private _snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  getIsSidebarOpened = this.isSidebarOpened.asObservable();
  getIsLoggedIn = this.isLoggedIn.asObservable();

  constructor() { }

  setIsSidebarOpened(isSidebarOpened: boolean){
    this.isSidebarOpened.next(isSidebarOpened);
  }

  setIsLoggedIn(isLoggedIn: boolean){
    this.isLoggedIn.next(isLoggedIn);
  }

  openSnackBar(message: string, color: SnackbarClassEnum, icon: SnackbarIconEnum){
    this.snackbarModel.message = message;
    this.snackbarModel.icon = icon;
    this.snackbarModel.color = color;

    this._snackBar.openFromComponent(SnackbarAnnotatedComponent, {
      duration:  5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      data: this.snackbarModel
    });
  }
}
